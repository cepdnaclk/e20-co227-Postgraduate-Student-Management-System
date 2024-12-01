import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminersToAdminComponent } from './examiners-to-admin.component';

describe('ExaminersToAdminComponent', () => {
  let component: ExaminersToAdminComponent;
  let fixture: ComponentFixture<ExaminersToAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminersToAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminersToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
