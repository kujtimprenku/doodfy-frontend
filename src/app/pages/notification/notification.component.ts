import {Component, OnInit} from '@angular/core';
import {InviteNotifications} from '../../_models/invite-notifications';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastMessageService} from '../../_services/toast-message.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    notifications: InviteNotifications[] = [];
    isLoading = false;

    constructor(private userService: UserService,
                private router: Router,
                private  titleService: Title,
                private toastMessageService: ToastMessageService, ) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.userService.getNotifications(50).subscribe((data: InviteNotifications[]) => {
            this.isLoading = false;
            this.notifications = data;
        });

        this.titleService.setTitle('Doodfy - Your Notifications');
    }

    onNavigate(invite: InviteNotifications) {
        if (invite.activity) {
            const id = invite['activity']['id'];
            this.router.navigate(['/activity', id]);
        } else if (invite['group']['group_type'] === 'group') {
            const id = invite['group']['id'];
            this.router.navigate(['/group', id]);
        } else if (invite['group']['group_type'] === 'club') {
            const id = invite['group']['id'];
            this.router.navigate(['/club', id]);
        }
    }

    removeNotification(id: string) {
        this.userService.removeNotification(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
            this.notifications = this.notifications.filter(notification => notification['id'] !== id);
        });
    }
}
