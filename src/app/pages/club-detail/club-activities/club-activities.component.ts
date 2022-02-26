import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../../_services/group.service';
import {Group} from '../../../_models/group';
import {ActivityService} from '../../../_services/activity.service';
import {Activity} from '../../../_models/activity';

@Component({
    selector: 'app-club-activities',
    templateUrl: './club-activities.component.html',
    styleUrls: ['./club-activities.component.css']
})
export class ClubActivitiesComponent implements OnInit {
    group: Group;
    activities: Activity[];

    constructor(private activityService: ActivityService,
                private router: Router,
                private groupService: GroupService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.groupService.getGroupById(params['id'], 'club').subscribe(data => {
                this.group = data;
            });

            this.groupService.getGroupActivities(params['id']).subscribe(data => {
                this.activities = data;
            });
        });
    }
}
