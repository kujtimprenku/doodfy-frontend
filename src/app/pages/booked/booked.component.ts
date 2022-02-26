import {Component, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import {ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './booked.component.html',
    styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {

    bookedActivities: Activity[];

    constructor(private route: ActivatedRoute, private titleService: Title) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: Activity[]) => {
            this.bookedActivities = data['bookedActivities'];
        });

        this.titleService.setTitle('Booked - Doodfy');
    }

}
