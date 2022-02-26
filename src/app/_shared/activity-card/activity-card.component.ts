import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import {ActivityService} from '../../_services/activity.service';
import {MatSnackBar} from '@angular/material';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../_services/group.service';
import {Group} from '../../_models/group';
import {AuthService} from '../../_services/auth.service';

@Component({
    selector: 'app-activity-card',
    templateUrl: './activity-card.component.html',
    styleUrls: ['./activity-card.component.css']
})
export class ActivityCardComponent implements OnInit {

    activities: Activity[];
    group: Group;
    isGroup: boolean;
    groupType = '';
    isClub: boolean;
    showAddNewActivity: boolean;
    isAuthenticated: boolean;


    get activity(): Activity[] {
        return this.activities;
    }

    @Input()
    set activity(activity: Activity[]) {
        this.activities = activity;
    }


    constructor(private activityService: ActivityService,
                private snackBar: MatSnackBar,
                private ngxSmartModalService: NgxSmartModalService,
                private route: ActivatedRoute,
                private router: Router,
                private groupService: GroupService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.isLoggedIn();
        this.getGroupOrClub();
    }

    getGroupOrClub() {
        this.isClub = this.router.url.includes('club', 0);
        this.isGroup = this.router.url.includes('group', 0);

        if (this.isClub) {
            this.groupType = 'club';
        } else if (this.isGroup) {
            this.groupType = 'group';
        }

        if ((this.isClub || this.isGroup) && this.groupType.length > 0) {
            this.route.params.subscribe(param => {
                this.groupService.getGroupById(param['id'], this.groupType).subscribe(data => {
                    this.group = data;
                    this.showAddNewActivity = (((this.isClub || this.isGroup) && (this.group.membership === 1)) || this.group.my_group);
                });
            });
        }
    }

    onSaveActivity(activity: Activity) {
        const model = {
            id: activity.id
        };
        this.activityService.saveActivity(model).subscribe(response => {
            this.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });

        this.activities.find(act => act.id === activity.id).has_saved = true;
    }


    onUnSaveActivity(id: number) {
        this.activityService.unSaveActivity(id).subscribe(response => {
            this.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });

        this.activities.find(activity => activity.id === id).has_saved = false;
    }


    onJoinActivity(activity: Activity) {
        const model = {
            id: activity.id
        };
        this.activityService.joinActivity(model).subscribe(response => {
            this.openSnackBar('Successfully joined', 'Undo');
        }, error => {
            console.log(error);
        });

        this.activities.find(act => act.id === activity.id).has_joined = true;
        this.activities.find(act => act.id === activity.id).nr_joined += 1;

    }


    onUnJoinActivity(id: number) {
        this.activityService.unJoinActivity(id).subscribe(response => {
            this.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });

        this.activities.find(activity => activity.id === id).has_joined = false;
        this.activities.find(activity => activity.id === id).nr_joined -= 1;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2500,
        });
    }

    onOpenModal() {
        this.ngxSmartModalService.getModal('myModal').open();
    }
    onCloseModal() {
        this.ngxSmartModalService.getModal('myModal').close();
    }

    onCreateActivity() {
        this.activityService.typeOfActivity.next(this.group);
        this.router.navigate(['/create-activity']);
    }

    error(activity: Activity) {
        activity.image = 'https://via.placeholder.com/350';
    }
}
