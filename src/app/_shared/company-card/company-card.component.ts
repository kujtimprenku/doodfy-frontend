import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../_models/company';
import { Group } from 'src/app/_models/group';

@Component({
    selector: 'app-company-card',
    templateUrl: './company-card.component.html',
    styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {

    @Input()
    companies: Company[];

    constructor() {
    }

    ngOnInit() {
    }

}
