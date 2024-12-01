import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentProfileBoxHeaderComponent } from './edit-student-profile-box-header.component';

describe('EditStudentProfileBoxHeaderComponent', () => {
  let component: EditStudentProfileBoxHeaderComponent;
  let fixture: ComponentFixture<EditStudentProfileBoxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStudentProfileBoxHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStudentProfileBoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
