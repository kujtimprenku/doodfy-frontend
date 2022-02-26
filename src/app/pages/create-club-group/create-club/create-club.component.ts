import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import {Category} from '../../../_models/category';
import {CategoryService} from '../../../_services/category.service';
import {GroupService} from '../../../_services/group.service';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.css']
})
export class CreateClubComponent implements OnInit {

  clubInformation = true;

  pending = false;
  clubInfoForm: FormGroup;
  countries;
  cities;
  chosenCities = [];
  categories: Category[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private groupService: GroupService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.clubInfoForm = this.fb.group({
      name: ['', [Validators.required]],
      country_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
      category_id: [null, [Validators.required]],
    });

    this.authService.getInitialInfo().subscribe(response => {
      this.countries = response['countries'];
      this.cities = response['cities'];
    });

    this.clubInfoForm.get('country_id').valueChanges.subscribe(data => {
      this.selectedCountry(data);
    });

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  selectedCountry(id: number) {
    this.chosenCities = this.cities.filter(c => +c['country_id'] === id);
  }

  onRegister() {
    if (this.clubInfoForm.valid) {
      this.pending = true;
      let id;
      const model = {
        ...this.clubInfoForm.value,
        group_type: 'club',
      };
      this.groupService.onCreateGroup(model).subscribe(
        response => {
          this.pending = false;
          id = response['id'];
        },
        error => {
          console.log(error);
          this.pending = false;
        },
        () => this.router.navigate(['/club', id])
      );
    }
  }
}
