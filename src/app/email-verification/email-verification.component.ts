import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Component({
    selector: 'app-email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

    constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.authService.authEmailVerification(this.route.snapshot.paramMap.get('id')).subscribe(response => {
            console.log(response);
            console.log(this.route.snapshot.paramMap.get('id'));
        });
    }

    continueToStart() {
        this.router.navigate(['start']);
    }
}
