import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const password = c.get('password');
    const rewritePassword = c.get('rewritePassword');

    if (password.pristine || rewritePassword.pristine) {
        return null;
    }

    if (password.value === rewritePassword.value) {
        return null;
    }
    return {'match': true};
}

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

    newPasswordForm: FormGroup;
    hide = true;
    pending = false;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private titleService: Title) {
    }

    ngOnInit() {
        this.newPasswordForm = this.fb.group({
            password: ['', Validators.required],
            rewritePassword: ['', Validators.required]
        }, {validator: passwordMatcher});

        this.titleService.setTitle('Forgot Password');
    }

    change() {

        if (this.newPasswordForm.valid) {
            this.pending = true;
            this.authService.authNewPassword(this.route.snapshot.paramMap.get('token'),
                this.newPasswordForm.value).subscribe(response => {
                console.log(response);
                this.pending = false;
            }, error => {
                console.log(error);
                this.pending = false;
            }, () => {
                this.router.navigate(['/login']);
            });
        }
    }

}
