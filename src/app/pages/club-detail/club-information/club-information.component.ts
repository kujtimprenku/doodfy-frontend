import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../../_services/group.service';
import {Group} from '../../../_models/group';

@Component({
    selector: 'app-club-information',
    templateUrl: './club-information.component.html',
    styleUrls: ['./club-information.component.css']
})
export class ClubInformationComponent implements OnInit {
    club: Group;
    club_id: number;

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService) {
    }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.club_id = +params['id'];
        });
        this.groupService.getGroupById(this.club_id, 'club').subscribe(data => {
            this.club = data;
        });
    }
}
