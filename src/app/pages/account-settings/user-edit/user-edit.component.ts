import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';
import {AuthService} from '../../../_services/auth.service';
import {ToastMessageService} from '../../../_services/toast-message.service';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    currentUser: User;
    countries = [];
    cities = [];
    chosenCities = [];
    image = '';
    pending = false;

    returnDate: Date;

    editForm: FormGroup;

    constructor(private userService: UserService,
                private authService: AuthService, private toastMessageService: ToastMessageService,
                private fb: FormBuilder,
                private titleService: Title) {
    }

    ngOnInit() {
        this.getCurrentUser();
        this.getInitialInfo();
        this.editForm = this.fb.group({
            firstName: '',
            lastName: '',
            email: '',
            biography: '',
            birthDate: '',
            gender: '',
            country: ['', Validators.required],
            city_id: ['', Validators.required],
            address: '',
            facebook_url: '',
            instagram_url: '',
            twitter_url: '',
        });

        this.editForm.get('country').valueChanges.subscribe(data => {
            this.selectedCountry(data);
        });
    }

    fillForm(user: User) {
        this.editForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            biography: user.biography,
            birthDate: new Date(user.birth_date),
            gender: user.gender,
            address: user.address,
            country: user.city.country_id,
            city_id: user.city.id,
            facebook_url: user.facebook_url,
            instagram_url: user.instagram_url,
            twitter_url: user.twitter_url,
        });

        this.editForm.get('email').disable();
        this.titleService.setTitle('Edit Profile - ' + user.username);
    }


    getCurrentUser() {
        this.userService.getEditUserInfo().subscribe((data: User) => {
            this.currentUser = data;
            this.image = this.currentUser.profile_image;
            this.fillForm(data);
        });
    }

    getInitialInfo() {
        this.authService.getInitialInfo().subscribe(data => {
            this.countries = data['countries'];
            this.cities = data['cities'];
        }, error => {
            console.log(error);
        }, () => {
            this.chosenCities = this.cities.filter(c => +c['country_id'] === this.currentUser.city['country_id']);
        });
    }

    selectedCountry(id: number) {
        this.chosenCities = this.cities.filter(c => +c['country_id'] === id);
    }

    setImageSrc(img: string) {
        this.image = img;
    }

    saveUserEdit() {
        this.returnDate = this.editForm.get('birthDate').value;
        let birth_date = null;
        if (this.returnDate !== null) {
            birth_date = this.returnDate.toLocaleDateString();
        }

        if (this.editForm.valid) {
            const model = {
                ...this.editForm.getRawValue(),
                birth_date: birth_date,
                profile_image: this.image
            };

            this.pending = true;
            this.userService.saveUserEdit(this.currentUser.id, model).subscribe(response => {
                this.toastMessageService.openSnackBar(response['message'], 'Undo');
                this.pending = false;
                this.authService.changeMemberPhoto(this.image);
            }, () => {
                this.toastMessageService.openSnackBar('Error occurred', 'Undo');
                this.pending = false;
            });
        }
    }
}
