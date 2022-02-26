import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-club",
  templateUrl: "./club.component.html",
  styleUrls: ["./club.component.css"]
})
export class ClubComponent implements OnInit {
  clubInformation = true;

  pending = false;
  emailExistErrorMessage: String;
  clubInfoForm: FormGroup;
  userInfoForm: FormGroup;
  countries;
  cities;
  chosenCities = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.clubInfoForm = this.fb.group({
      club_name: ["", [Validators.required]],
      country_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
      street: ["", [Validators.required]],
      category: ""
    });
    this.userInfoForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    this.authService.getInitialInfo().subscribe(response => {
      this.countries = response["countries"];
      this.cities = response["cities"];
    });

    this.clubInfoForm.get("country_id").valueChanges.subscribe(data => {
      this.selectedCountry(data);
    });
  }

  selectedCountry(id: number) {
    this.chosenCities = this.cities.filter(c => +c["country_id"] === id);
  }

  toggleClub() {
    if (this.clubInfoForm.valid) {
      this.clubInformation = !this.clubInformation;
    }
  }

  onRegister() {
    if (this.clubInfoForm.valid && this.userInfoForm) {
      this.pending = true;
      const model = {
        user: this.userInfoForm.value,
        club: this.clubInfoForm.value
      };
      console.log(model);
      this.authService.onClubRegister(model).subscribe(
        response => {
          this.pending = false;
        },
        error => {
          console.log(error);
          this.pending = false;
        },
        () => this.router.navigate(["start"])
      );
    }
  }

  emailCheck() {
    this.authService
      .checkEmailAvailable({ email: this.userInfoForm.get("email").value })
      .subscribe(
        response => (this.emailExistErrorMessage = null),
        error => {
          this.emailExistErrorMessage = error.error.error;
        }
      );
  }
}
