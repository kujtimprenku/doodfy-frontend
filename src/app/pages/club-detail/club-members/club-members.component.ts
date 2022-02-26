import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/_models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from 'src/app/_services/user.service';
import {ToastMessageService} from 'src/app/_services/toast-message.service';
import {GroupService} from '../../../_services/group.service';
import {Group} from '../../../_models/group';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {AuthService} from '../../../_services/auth.service';

@Component({
    selector: 'app-club-members',
    templateUrl: './club-members.component.html',
    styleUrls: ['./club-members.component.css']
})
export class ClubMembersComponent implements OnInit {
    members: User[];
    requestedMembers: User[];
    club_id;
    club: Group;

    myControl = new FormControl();
    myFriends: User[] = [];
    filteredOptions: Observable<User[]>;
    isAuthenticated: boolean;

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        private userService: UserService,
        private toastMessageService: ToastMessageService,
        private authService: AuthService) {}

    ngOnInit() {
        this.isAuthenticated = this.authService.isLoggedIn();
        if (!this.isAuthenticated) {
            this.myControl.disable();
        } else {
            this.groupService.getInviteFriendsGroupList(this.route.snapshot.parent.params['id']).subscribe((data: User[]) => {
                this.myFriends = data;
            });
        }
        this.groupService.getMembers(this.route.snapshot.parent.params['id']).subscribe(data => {
            this.members = data;
        });
        this.groupService.getRequestedMembers(this.route.snapshot.parent.params['id']).subscribe(data => {
            this.requestedMembers = data;
        });
        this.route.parent.params.subscribe(params => {
            this.club_id = params['id'];
        });
        this.groupService.getGroupById(this.club_id, 'club').subscribe(data => {
            this.club = data;
        });

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );

    }

    private _filter(value: string): User[] {
        const filterValue = value.toLowerCase();
        return this.myFriends.filter(user => user.username.toLowerCase().includes(filterValue));
    }

    onAddMember(user: User): void {
        const model = {
            group_id: this.club_id,
            user_id: user.id
        };
        this.groupService.acceptMembershipRequest(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        this.requestedMembers = this.requestedMembers.filter(member => member.id !== user.id);

        user['membership'] = 1;
        this.members.push(user);
    }

    onRemoveMember(user: User) {
        const model = {
            group_id: this.club_id,
            user_id: user.id
        };
        this.groupService.cancelMembership(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        user['membership'] = 2;
    }

    onInviteFriend(user: User) {
        if (!user['is_invited']) {
            const model = {
                recipient_id: user.id,
                group_id: this.club.id,
            };

            this.groupService.inviteFriendToGroup(model).subscribe(response => {
                this.toastMessageService.openSnackBar(response['message'], 'Undo');
                user['is_invited'] = true;
            });
        }
        this.myControl.patchValue('');
    }
}
