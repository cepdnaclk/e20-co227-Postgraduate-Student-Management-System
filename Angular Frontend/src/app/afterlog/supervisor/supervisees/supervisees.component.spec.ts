import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperviseesComponent } from './supervisees.component';

describe('SuperviseesComponent', () => {
  let component: SuperviseesComponent;
  let fixture: ComponentFixture<SuperviseesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperviseesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperviseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
