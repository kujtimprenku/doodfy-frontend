import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_models/user';
import {Group} from '../../../_models/group';
import {GroupService} from '../../../_services/group.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../_services/user.service';
import {ToastMessageService} from '../../../_services/toast-message.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {City} from '../../../_models/city';
import {AuthService} from '../../../_services/auth.service';

@Component({
    selector: 'app-group-members',
    templateUrl: './group-members.component.html',
    styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {

    members: User[];
    requestedMembers: User[];
    group_id;
    group: Group;

    myControl = new FormControl();
    myFriends: User[] = [];
    filteredOptions: Observable<User[]>;
    isAuthenticated: boolean;


    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute,
        private userService: UserService,
        private toastMessageService: ToastMessageService,
        private authService: AuthService) {
    }

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
            this.group_id = params['id'];
        });
        this.groupService.getGroupById(this.group_id, 'group').subscribe(data => {
            this.group = data;

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
            group_id: this.group_id,
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
            group_id: this.group_id,
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
                group_id: this.group.id,
            };

            this.groupService.inviteFriendToGroup(model).subscribe(response => {
                this.toastMessageService.openSnackBar(response['message'], 'Undo');
                user['is_invited'] = true;
            });
        }
        this.myControl.patchValue('');
    }
}
