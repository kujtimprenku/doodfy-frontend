import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models/user';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './user-friends.component.html',
    styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
    userFriends: User[];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.userFriends = data['userFriends'];
        });
    }
}
