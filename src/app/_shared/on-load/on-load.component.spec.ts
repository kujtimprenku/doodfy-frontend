import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnLoadComponent } from './on-load.component';

describe('OnLoadComponent', () => {
  let component: OnLoadComponent;
  let fixture: ComponentFixture<OnLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
