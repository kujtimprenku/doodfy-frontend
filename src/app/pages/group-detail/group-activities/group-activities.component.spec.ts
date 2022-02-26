import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupActivitiesComponent } from './group-activities.component';

describe('GroupActivitiesComponent', () => {
  let component: GroupActivitiesComponent;
  let fixture: ComponentFixture<GroupActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
