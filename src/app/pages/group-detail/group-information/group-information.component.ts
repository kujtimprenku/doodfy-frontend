import {Component, OnInit} from '@angular/core';
import {Group} from '../../../_models/group';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../../_services/group.service';

@Component({
    selector: 'app-group-information',
    templateUrl: './group-information.component.html',
    styleUrls: ['./group-information.component.css']
})
export class GroupInformationComponent implements OnInit {
    group: Group;
    group_id: number;

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService) {
    }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.group_id = +params['id'];
        });
        this.groupService.getGroupById(this.group_id, 'group').subscribe(data => {
            this.group = data;
        });
    }
}
