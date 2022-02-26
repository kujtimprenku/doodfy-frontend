import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit {
  constructor(private titleService: Title, private route: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle('Manage Club / Group - Doodfy');
  }

}
