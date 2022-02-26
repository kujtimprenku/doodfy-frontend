import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/_models/activity';
import { ActivityService } from 'src/app/_services/activity.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  mostJoined: Activity[];
  mostViewed: Activity[];

  constructor(private activityService: ActivityService, private titleService: Title) { }

  ngOnInit() {
    this.activityService.getTrendingMostJoinedActivities().subscribe((data: Activity[]) => {
      this.mostJoined = data;
    });

    this.activityService.getTrendingMostViewedActivities().subscribe((data: Activity[]) => {
      this.mostViewed = data;
    });

    this.titleService.setTitle('Trending - Doodfy')
  }

}
