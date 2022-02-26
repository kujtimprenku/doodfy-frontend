import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';

function equalCheck(x: string, y: string) {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        const first = c.get(x);
        const second = c.get(y);

        if (first.pristine || second.pristine) {
            return null;
        }

        if (second.value === '') {
            return null;
        }

        if (second.dirty && (first.value !== second.value)) {
            return {'notEqual': true};

        }
        return null;
    };
}


@Component({
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
    firmInformation = true;
    // contactInformation = false;
    // loginInformation = false;

    pending = false;
    emailExistErrorMessage: String;
    companyInfoForm: FormGroup;
    userInfoForm: FormGroup;
    countries;
    cities;
    chosenCities = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.companyInfoForm = this.fb.group({
            firm: ['', [Validators.required]],
            country_id: [null, [Validators.required]],
            city_id: [null, [Validators.required]],
            street: ['', [Validators.required]],
            branch: '',
            website: ''
        });
        this.userInfoForm = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });


        // emailGroup: this.fb.group({
        //     email: ['', [Validators.required, Validators.email]],
        //     repeatEmail: ['', [Validators.required]],
        // }, {validator: equalCheck('email', 'repeatEmail')}),
        //
        // passwordGroup: this.fb.group({
        //     password: ['', [Validators.required]],
        //     repeatPassword: ['', [Validators.required]]
        // })


        this.authService.getInitialInfo().subscribe(response => {
            this.countries = response['countries'];
            this.cities = response['cities'];
        });

        this.companyInfoForm.get('country_id').valueChanges.subscribe(data => {
            this.selectedCountry(data);
        });
    }

    selectedCountry(id: number) {
        this.chosenCities = this.cities.filter(c => +c['country_id'] === id);
    }

    toggleFirm() {
        if (this.companyInfoForm.valid) {
            this.firmInformation = !this.firmInformation;
            // this.contactInformation = !this.contactInformation;
        }

    }

    // toggleContact() {
    //     // if (this.registerCompanyForm.get('userInfo').valid) {
    //     this.contactInformation = !this.contactInformation;
    //     this.loginInformation = !this.loginInformation;
    //     // }
    // }

    onRegister() {
        if (this.companyInfoForm.valid && this.userInfoForm) {
            this.pending = true;
            const model = {
                user: this.userInfoForm.value,
                company: this.companyInfoForm.value
            };
            this.authService.onCompanyRegister(model).subscribe(response => {
                this.pending = false;
            }, error => {
                console.log(error);
                this.pending = false;
            }, () => {
                if (+this.authService.getRoleId() === 1) {
                    this.router.navigate(['start']);
                } else {
                    this.router.navigate(['dashboard']);
                }
            });
        }
    }

    emailCheck() {
        this.authService.checkEmailAvailable({email: this.userInfoForm.get('email').value}).subscribe(
            response => this.emailExistErrorMessage = null,
            error => {
                this.emailExistErrorMessage = error.error.error;
            }
        );
    }
}
