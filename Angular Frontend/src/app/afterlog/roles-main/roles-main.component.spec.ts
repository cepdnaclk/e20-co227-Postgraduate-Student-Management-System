import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesMainComponent } from './roles-main.component';

describe('RolesMainComponent', () => {
  let component: RolesMainComponent;
  let fixture: ComponentFixture<RolesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolesMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
