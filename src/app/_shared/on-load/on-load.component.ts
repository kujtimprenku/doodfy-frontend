import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-on-load',
    templateUrl: './on-load.component.html',
    styleUrls: ['./on-load.component.css']
})
export class OnLoadComponent implements OnInit {

    activities = new Array(12);

    constructor() {
    }

    ngOnInit() {
    }

}
