import {Component, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import {ActivatedRoute} from '@angular/router';
import {ActivityService} from '../../_services/activity.service';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    historyActivities: Activity[];

    constructor(private activityService: ActivityService, private route: ActivatedRoute,
                private titleService: Title) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.historyActivities = data['historyActivities'];
        });

        this.titleService.setTitle('History - Doodfy');
    }

    onDeleteHistory() {
        this.activityService.deleteActivityHistory().subscribe(() => {
            this.historyActivities = [];
        });
    }

}
