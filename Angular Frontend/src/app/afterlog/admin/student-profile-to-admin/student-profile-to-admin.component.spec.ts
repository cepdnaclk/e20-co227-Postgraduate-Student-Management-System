import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileToAdminComponent } from './student-profile-to-admin.component';

describe('StudentProfileToAdminComponent', () => {
  let component: StudentProfileToAdminComponent;
  let fixture: ComponentFixture<StudentProfileToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentProfileToAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
