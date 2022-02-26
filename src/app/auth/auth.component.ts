import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(public authService: AuthService,
        private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Doodfy');
    }

}
