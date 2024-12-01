import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileForStaffComponent } from './edit-profile-for-staff.component';

describe('EditProfileForStaffComponent', () => {
  let component: EditProfileForStaffComponent;
  let fixture: ComponentFixture<EditProfileForStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileForStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileForStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
