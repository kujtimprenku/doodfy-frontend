import {Component, OnInit} from '@angular/core';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastMessageService} from '../../_services/toast-message.service';
import { Title } from '@angular/platform-browser';
import {AuthService} from '../../_services/auth.service';

@Component({
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    user: User;
    currentUserId;
    value;
    isAuthenticated: boolean;
    topics = [];

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private toastMessageService: ToastMessageService,
                private titleService: Title,
                private authService: AuthService) {
    }

    ngOnInit(): void {

        this.isAuthenticated = this.authService.isLoggedIn();

        if (this.isAuthenticated) {
            this.userService.getCurrentUser().subscribe((data: User) => {
                this.currentUserId = data.id;
            });
        }

        this.route.data.subscribe(data => {
            this.user = data['user'];
            this.value = this.user.friendship;
            this.titleService.setTitle(this.user.username);
        });

    }

    onAddFriend(): void {
        const model = {
            sender: this.currentUserId,
            recipient: this.user.id
        };
        this.userService.addFriend(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        this.user.friendship = 0;
        this.value = this.user.friendship;
    }

    ifCurrentUser(): boolean {
        if (this.router.url.includes('/' + this.currentUserId)) {
            return true;
        }
        return false;
    }

    onUnfriendUser() {
        this.userService.unFriend(this.user.id).subscribe(response => {
            console.log(response);
        });
        this.user.friendship = -1;
        this.value = this.user.friendship;
    }

    onCancelSendFriendRequest() {
        this.userService.cancelSendFriendRequest(this.user.id).subscribe(response => {
            console.log(response);
        });
        this.user.friendship = -1;
        this.value = this.user.friendship;
    }

    onAcceptFriendRequest() {
        this.userService.acceptFriendRequest(this.user.id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        this.user.friendship = 1;
        this.value = this.user.friendship;
    }
    navigate(path: string, id: number) {

        if (path) {
            this.router.navigate([path], {relativeTo: this.route});
        } else {
            this.router.navigate(['/', id]);
        }

    }
}
