import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignExaminerByAdminComponent } from './assign-examiner-by-admin.component';

describe('AssignExaminerByAdminComponent', () => {
  let component: AssignExaminerByAdminComponent;
  let fixture: ComponentFixture<AssignExaminerByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignExaminerByAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignExaminerByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
