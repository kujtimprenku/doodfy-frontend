import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ToastMessageService} from '../../_services/toast-message.service';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {ActivityService} from '../../_services/activity.service';
import {AuthService} from '../../_services/auth.service';

@Component({
    selector: 'app-repeat-activity-modal',
    templateUrl: './repeat-activity-modal.component.html',
    styleUrls: ['./repeat-activity-modal.component.css']
})
export class RepeatActivityModalComponent implements OnInit {

    @Input() repeatedActivities: Activity[];
    @Input() isLoading: boolean;
    @Input() my_activity: boolean;
    @Input() parent_id;
    isAuthenticated: boolean;

    constructor(private ngxSmartModalService: NgxSmartModalService,
                private activityService: ActivityService,
                private router: Router,
                private dialog: MatDialog,
                private toastMessageService: ToastMessageService,
                private route: ActivatedRoute,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.isLoggedIn();
    }

    onCloseModal() {
        this.ngxSmartModalService.get('repeatedActivtites').close();
    }

    deleteActivity(id: number) {
        this.activityService.deleteActivity(id).subscribe(() => {
            this.toastMessageService.openSnackBar('Successfully deleted', 'Undo');
        });
        this.repeatedActivities = this.repeatedActivities.filter(activity => activity.id !== id);
    }

    confirmActivityDelete(id: number) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: 'Do you want to delete this activity?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteActivity(id);
            }
        });
    }

    onJoinActivity(activity: Activity) {
        const model = {
            id: activity.id
        };
        this.activityService.joinActivity(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });

        activity.nr_joined += 1;
        activity.has_joined = true;
    }

    onUnJoinActivity(activity: Activity) {
        this.activityService.unJoinActivity(activity.id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });

        activity.nr_joined -= 1;
        activity.has_joined = false;
    }


    deleteAllActivities(id: number) {
        this.activityService.deleteAllActivityOccurrences(id).subscribe(() => {
            this.toastMessageService.openSnackBar('Successfully deleted', 'Undo');
            this.router.navigate(['/start']);
        });
    }

    deleteAllActivityOccurrences() {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: 'Delete all activity occurrences?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteAllActivities(this.parent_id);
            }
        });
    }
}
