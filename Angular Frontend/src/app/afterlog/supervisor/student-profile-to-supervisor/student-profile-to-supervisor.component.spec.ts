import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileToSupervisorComponent } from './student-profile-to-supervisor.component';

describe('StudentProfileToSupervisorComponent', () => {
  let component: StudentProfileToSupervisorComponent;
  let fixture: ComponentFixture<StudentProfileToSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentProfileToSupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileToSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
