import {Component, OnInit} from '@angular/core';
import {Group} from '../../../_models/group';
import {Activity} from '../../../_models/activity';
import {ActivityService} from '../../../_services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../../_services/group.service';

@Component({
    selector: 'app-group-activities',
    templateUrl: './group-activities.component.html',
    styleUrls: ['./group-activities.component.css']
})
export class GroupActivitiesComponent implements OnInit {

    group: Group;
    activities: Activity[];

    constructor(private activityService: ActivityService,
                private router: Router,
                private groupService: GroupService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.groupService.getGroupById(this.route.snapshot.params['id'], 'group').subscribe(data => {
            this.group = data;
        });

        this.groupService.getGroupActivities(this.route.snapshot.params['id']).subscribe(data => {
            this.activities = data;
        });
    }

    onCreateActivity() {
        this.activityService.typeOfActivity.next(this.group);
        this.router.navigate(['/create-activity']);
    }
}
