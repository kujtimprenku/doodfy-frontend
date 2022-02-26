import {Component, OnInit} from '@angular/core';
import {Activity} from '../../../_models/activity';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './user-created-activities.component.html',
    styleUrls: ['./user-created-activities.component.css']
})
export class UserCreatedActivitiesComponent implements OnInit {

    userActivities: Activity[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            data => {
                this.userActivities = data['userActivities'];
            }
        );
    }

}
