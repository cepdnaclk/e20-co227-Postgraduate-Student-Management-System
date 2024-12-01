import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollapsibleSectionComponent } from './create-collapsible-section.component';

describe('CreateCollapsibleSectionComponent', () => {
  let component: CreateCollapsibleSectionComponent;
  let fixture: ComponentFixture<CreateCollapsibleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCollapsibleSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCollapsibleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
