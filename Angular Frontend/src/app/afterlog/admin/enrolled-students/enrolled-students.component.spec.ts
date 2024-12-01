import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledStudentsComponent } from './enrolled-students.component';

describe('EnrolledStudentsComponent', () => {
  let component: EnrolledStudentsComponent;
  let fixture: ComponentFixture<EnrolledStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrolledStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
