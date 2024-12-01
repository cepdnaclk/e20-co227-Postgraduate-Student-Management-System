import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsToExaminerComponent } from './students-to-examiner.component';

describe('StudentsToExaminerComponent', () => {
  let component: StudentsToExaminerComponent;
  let fixture: ComponentFixture<StudentsToExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsToExaminerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsToExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
