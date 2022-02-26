import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    pending = false;
    hide = true;
    loginForm: FormGroup;
    message: string;

    showForgotPassword = false;
    emailForPasswordChange = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private titleService: Title) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required]]
            });
            
        this.titleService.setTitle('Doodfy - Sign In');
    }


    login() {

        if (this.loginForm.valid) {
            this.pending = true;
            this.authService.onLogin(this.loginForm.value).subscribe(next => {
                    this.pending = false;
                },
                error => {
                    this.message = error.error.error;
                    this.pending = false;
                },
                () => {
                    const role_id = +this.authService.getRoleId();
                    if (role_id === 1) {
                        this.router.navigate(['start']);
                    } else {
                        this.router.navigate(['dashboard']);
                    }
                });
        }
    }

    forgotPassword() {
        this.pending = true;
        this.authService.authForgotPassword({email: this.emailForPasswordChange}).subscribe(response => {
            this.authService.emailConfirm.show = true;
            this.authService.emailConfirm.message = response['message'];
            this.pending = false;
        }, error => {
            this.pending = false;
        }, () => {
            this.showForgotPassword = false;
        });
    }
}
