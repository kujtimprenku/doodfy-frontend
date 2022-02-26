import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/_services/activity.service';
import { ToastMessageService } from 'src/app/_services/toast-message.service';

@Component({
    selector: 'app-activity-extended-card',
    templateUrl: './activity-extended-card.component.html',
    styleUrls: ['./activity-extended-card.component.css']
})
export class ActivityExtendedCardComponent implements OnInit {

    @Input()
    activities: Activity[];
    description:  string;
    message: string;
    constructor(private router: Router, private activityService: ActivityService, private toastMessageService: ToastMessageService) {
    }

    ngOnInit() {
        if (this.router.url === '/booked') {
            this.message = 'Unjoin';
        }
        if (this.router.url === '/saved') {
            this.message = 'Unsave';
        }
    }

    unSave(id: number) {
        if (this.router.url === '/booked') {
            this.activityService.unJoinActivity(id).subscribe(response => {
                this.toastMessageService.openSnackBar(response['message'], 'Undo');
            }, error => {
                console.log(error);
            });

            this.activities = this.activities.filter(activity => activity.id !== id);
        }

        if (this.router.url === '/saved') {
            this.activityService.unSaveActivity(id).subscribe(response => {
                this.toastMessageService.openSnackBar(response['message'], 'Undo');
            }, error => {
                console.log(error);
            });

            this.activities = this.activities.filter(activity => activity.id !== id);
        }
    }

    displayDescription(description: string) {
        if (description.length > 0 && description.length > 230) {
            return description.substring(0, 230) + '...';
        }
        return description;

    }

}
