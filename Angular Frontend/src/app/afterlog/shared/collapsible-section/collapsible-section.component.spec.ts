import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleSectionComponent } from './collapsible-section.component';

describe('CollapsibleSectionComponent', () => {
  let component: CollapsibleSectionComponent;
  let fixture: ComponentFixture<CollapsibleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollapsibleSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapsibleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
