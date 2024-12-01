import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorsToAdminComponent } from './supervisors-to-admin.component';

describe('SupervisorsToAdminComponent', () => {
  let component: SupervisorsToAdminComponent;
  let fixture: ComponentFixture<SupervisorsToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupervisorsToAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorsToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
