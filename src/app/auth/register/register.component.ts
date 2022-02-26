import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private titleSerice: Title) { }

  ngOnInit() {
    this.titleSerice.setTitle('Doodfy - Sign Up');
  }

}
