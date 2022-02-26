import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import {ActivityService} from '../../_services/activity.service';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
    selector: 'app-profile-activity-card',
    templateUrl: './profile-activity-card.component.html',
    styleUrls: ['./profile-activity-card.component.css']
})
export class ProfileActivityCardComponent implements OnInit {

    @Input()
    activities: Activity[];
    repeatedActivities: Activity[];
    isLoading: boolean;
    my_activity: boolean;
    parent_id;

    constructor(private activityService: ActivityService,
                private ngxSmartModalService: NgxSmartModalService) {
    }

    ngOnInit() {

    }

    onOpenModal(id: number) {
        this.isLoading = true;
        this.parent_id = id;
        this.ngxSmartModalService.getModal('repeatedActivtites').open();
        this.activityService.occurrencesActivity(id).subscribe(response => {
                this.repeatedActivities = response;
                this.isLoading = false;
            },
            (error) => {
                console.log(error);
            }, () => {
                this.my_activity = this.repeatedActivities.find(activity => activity['parent_id'] === id).my_activity;
            });
    }
}
