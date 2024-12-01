import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileToExaminerComponent } from './student-profile-to-examiner.component';

describe('StudentProfileToExaminerComponent', () => {
  let component: StudentProfileToExaminerComponent;
  let fixture: ComponentFixture<StudentProfileToExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentProfileToExaminerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileToExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
