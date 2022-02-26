import {Component, OnInit} from '@angular/core';
import {Activity} from '../../../_models/activity';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-company-activities',
    templateUrl: './company-activities.component.html',
    styleUrls: ['./company-activities.component.css']
})
export class CompanyActivitiesComponent implements OnInit {
    activities: Activity[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.activities = data['companyActivities'];
        });
    }
}

