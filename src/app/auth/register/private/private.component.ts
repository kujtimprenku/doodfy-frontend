import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {User} from '../../../_models/user';
import {Category} from '../../../_models/category';
import {Router} from '@angular/router';

@Component({
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

    pending = false;
    hide = true;
    showCategories = false;
    emailExistErrorMessage: String;

    registerPrivateForm: FormGroup;
    user: User;
    categories: Category[];
    selectedCategories: Category[] = [];
    countries;
    cities;
    chosenCities = [];


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {

        this.authService.getInitialInfo().subscribe(response => {
            this.categories = response['categories'];
            console.log(this.categories);
            this.countries = response['countries'];
            this.cities = response['cities'];
        });

        this.registerPrivateForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            gender: 'male',
            state: [null, [Validators.required]],
            city_id: [null, [Validators.required]]
        });

        this.registerPrivateForm.get('state').valueChanges.subscribe(data => {
            this.selectedCountry(data);
        });
    }

    register(): void {
        this.user = this.registerPrivateForm.value;
        const model = {
            user: this.user,
            categories: this.selectedCategories
        };
        this.pending = true;
        if (this.registerPrivateForm.valid) {

            this.authService.onRegister(model).subscribe(response => {
                    this.pending = false;
                },
                error => {
                    this.pending = false;
                    console.log(error);
                },
                () => {
                    this.router.navigate(['start']);
                    // this.authService.emailConfirm.show = true;
                });
        } else {
            this.showCategories = !this.showCategories;
        }
    }

    emailCheck() {
        this.authService.checkEmailAvailable({email: this.registerPrivateForm.get('email').value}).subscribe(
            response => this.emailExistErrorMessage = null,
            error => {
                this.emailExistErrorMessage = error.error.error;
            }
        );
    }

    selectedCountry(id: number) {
        this.chosenCities = this.cities.filter(c => +c['country_id'] === id);
    }

    toggleCategories(): void {
        if (this.registerPrivateForm.valid && this.emailExistErrorMessage === null) {
            this.showCategories = !this.showCategories;
        }
    }

    onClickCategory(id: number): void {

        if (this.selectedCategories.some(category => category.id === id)) {
            this.selectedCategories = this.selectedCategories.filter(category => category.id !== id);
        } else {
            this.categories.map(category => {
                if (category.id === id) {
                    this.selectedCategories.push(category);
                }
            });
        }
    }

    setOverlay(id: number): boolean {
        return this.selectedCategories.some(category => category.id === id);
    }
}
