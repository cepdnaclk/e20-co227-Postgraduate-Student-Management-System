import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffMembersByAdminComponent } from './add-staff-members-by-admin.component';

describe('AddStaffMembersByAdminComponent', () => {
  let component: AddStaffMembersByAdminComponent;
  let fixture: ComponentFixture<AddStaffMembersByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStaffMembersByAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffMembersByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
