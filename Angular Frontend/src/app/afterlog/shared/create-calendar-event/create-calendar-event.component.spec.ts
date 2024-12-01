import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCalendarEventComponent } from './create-calendar-event.component';

describe('CreateCalendarEventComponent', () => {
  let component: CreateCalendarEventComponent;
  let fixture: ComponentFixture<CreateCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCalendarEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
