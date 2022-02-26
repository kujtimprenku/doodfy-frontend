import {Component, OnInit} from '@angular/core';
import {Activity} from '../../../_models/activity';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './user-participated-activities.component.html',
    styleUrls: ['./user-participated-activities.component.css']
})
export class UserParticipatedActivitiesComponent implements OnInit {

    participatedActivities: Activity[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.participatedActivities = data['userHistoryActivities'];
        });
    }

}
