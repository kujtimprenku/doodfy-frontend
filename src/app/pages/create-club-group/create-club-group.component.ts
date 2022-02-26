import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import {Category} from '../../_models/category';
import {ToastMessageService} from '../../_services/toast-message.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-club-group',
  templateUrl: './create-club-group.component.html',
  styleUrls: ['./create-club-group.component.css']
})
export class CreateClubGroupComponent implements OnInit {
  active = 'Club';
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Create Club / Group - Doodfy');
  }

}
