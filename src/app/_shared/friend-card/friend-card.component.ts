import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ToastMessageService } from 'src/app/_services/toast-message.service';
import {AuthService} from '../../_services/auth.service';

@Component({
    selector: 'app-friend-card',
    templateUrl: './friend-card.component.html',
    styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {

    @Input()
    users: User[];
    currentUserId;
    isAuthenticated: boolean;
    username: string;

    constructor(private userService: UserService,
                private toastMessageService: ToastMessageService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.isLoggedIn();

        if (this.isAuthenticated) {
            this.userService.getCurrentUser().subscribe((data: User) => {
                this.currentUserId = data.id;
            });
        }
    }

    onAddFriend(user: User): void {
        const model = {
            sender: this.currentUserId,
            recipient: user.id
        };
        this.userService.addFriend(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        user.friendship = 0;
    }

    onUnfriendUser(user: User) {
        this.userService.unFriend(user.id).subscribe(response => {
            console.log(response);
        });
        user.friendship = -1;
    }

    onCancelSendFriendRequest(user: User) {
        this.userService.cancelSendFriendRequest(user.id).subscribe(response => {
            console.log(response);
        });
        user.friendship = -1;
    }

    onAcceptFriendRequest(user: User) {
        this.userService.acceptFriendRequest(user.id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        user.friendship = 1;
    }

    getUsername(username: string) {
        this.username = username;
    }
}
