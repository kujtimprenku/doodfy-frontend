import {Component, OnInit} from '@angular/core';
import {Activity} from '../../_models/activity';
import {ActivityService} from '../../_services/activity.service';
import {Company} from 'src/app/_models/company';
import {CompanyService} from '../../_services/company.service';
import { Title } from '@angular/platform-browser';
import {PlaceService} from '../../_services/place.service';
import {Place} from '../../_models/place';
import {City} from '../../_models/city';
import {Category} from '../../_models/category';
import {Comment} from '../../_models/comment';
import {User} from '../../_models/user';
import {Rating} from '../../_models/rating';
import {startActivities, startCompanies} from '../../mocks/activities';


@Component({
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

    activities: Activity[];
    companies: Company[];
    places: Place[];

    constructor(private activityService: ActivityService,
                private companyService: CompanyService,
                private titleService: Title,
                private  placesService: PlaceService) {
    }

    ngOnInit() {
        this.activities = startActivities;
        // this.activityService.getStartRecommendedActivities().subscribe((data: Activity[]) => {
        //     this.activities = data
        // }, error => {
        //     console.log(error);
        // });
        this.companies = startCompanies;
        // this.companyService.getCompanies().subscribe((data: Company[]) => {
        //     this.companies = data;
        // }, error => {
        //     console.log(error);
        // });
        this.titleService.setTitle('Start - Doodfy');
        this.getPlaces();
    }
    getPlaces() {
        this.placesService.getPlaces().subscribe((data: Place[]) => {
            this.places = data;
        });
    }
}
