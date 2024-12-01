import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerDashboardComponent } from './examiner-dashboard.component';

describe('ExaminerDashboardComponent', () => {
  let component: ExaminerDashboardComponent;
  let fixture: ComponentFixture<ExaminerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
