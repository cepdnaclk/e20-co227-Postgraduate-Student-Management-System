import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalendarComponent } from './main-calendar.component';

describe('MainCalendarComponent', () => {
  let component: MainCalendarComponent;
  let fixture: ComponentFixture<MainCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
