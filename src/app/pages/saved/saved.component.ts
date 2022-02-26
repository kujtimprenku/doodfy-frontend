import {Component, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import {ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
    templateUrl: './saved.component.html',
    styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
    savedActivities: Activity[];


    constructor(private route: ActivatedRoute, private titleService: Title) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: Activity[]) => {
            this.savedActivities = data['savedActivities'];
        });

        this.titleService.setTitle('Saved - Doodfy');
    }

}
