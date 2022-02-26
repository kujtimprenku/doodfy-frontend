import { GroupService } from './../../../_services/group.service';
import { Group } from './../../../_models/group';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Group[];
  groupsin: Group[];
  groupsPending = false;

  constructor(private groupsService: GroupService) { }

  ngOnInit() {
    this.groupsService.getMyGroups('group').subscribe((data: Group[]) => {
      this.groups = data;
      this.groupsPending = true;
  }, error => {
      console.log(error);
  });
  this.groupsService.getGroupMemberships('group').subscribe((data: Group[]) => {
    this.groupsin = data;
    this.groupsPending = true;
}, error => {
    console.log(error);
});
  }

}
