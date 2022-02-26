import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/_models/group';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  clubs: Group[];
  clubsin: Group[];
  clubsPending = false;

  constructor(private groupsService: GroupService) { }

  ngOnInit() {
    this.groupsService.getMyGroups('club').subscribe((data: Group[]) => {
      this.clubs = data;
      this.clubsPending = true;
  }, error => {
      console.log(error);
  });
  this.groupsService.getGroupMemberships('club').subscribe((data: Group[]) => {
    this.clubsin = data;
    this.clubsPending = true;
}, error => {
    console.log(error);
});
  }

}
