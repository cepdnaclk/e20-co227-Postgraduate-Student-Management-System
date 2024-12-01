import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeForRolesComponent } from './home-for-roles.component';

describe('HomeForRolesComponent', () => {
  let component: HomeForRolesComponent;
  let fixture: ComponentFixture<HomeForRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeForRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeForRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
