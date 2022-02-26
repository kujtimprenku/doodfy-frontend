import { Component, OnInit } from '@angular/core';
import {PlaceService} from '../../_services/place.service';
import {Place} from '../../_models/place';
import {ActivityService} from '../../_services/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Activity} from '../../_models/activity';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  place: Place;
  activities: Activity [];
  constructor(
      private placeService: PlaceService,
      private activityService: ActivityService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.placeService.activityPlace(id).subscribe( (data: Place) => {
      this.place = data;
    });
    this.placeService.placeActivities(id).subscribe((data: Activity[]) => {
      this.activities = data;
    });
  }

  onCreateActivity() {
    this.activityService.typeOfPlaceActivity.next(this.place);
    this.router.navigate(['/create-activity']);
  }

}
