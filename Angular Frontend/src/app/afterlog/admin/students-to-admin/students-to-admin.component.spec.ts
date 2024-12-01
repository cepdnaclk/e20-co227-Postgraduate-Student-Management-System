import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsToAdminComponent } from './students-to-admin.component';

describe('StudentsToAdminComponent', () => {
  let component: StudentsToAdminComponent;
  let fixture: ComponentFixture<StudentsToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsToAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
