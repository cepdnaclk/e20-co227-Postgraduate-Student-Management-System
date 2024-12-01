import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSupervisorByAdminComponent } from './assign-supervisor-by-admin.component';

describe('AssignSupervisorByAdminComponent', () => {
  let component: AssignSupervisorByAdminComponent;
  let fixture: ComponentFixture<AssignSupervisorByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignSupervisorByAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignSupervisorByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
