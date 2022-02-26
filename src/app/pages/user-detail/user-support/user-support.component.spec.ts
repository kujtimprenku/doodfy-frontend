/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserSupportComponent } from './user-support.component';

describe('UserSupportComponent', () => {
  let component: UserSupportComponent;
  let fixture: ComponentFixture<UserSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
