import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionTileComponent } from './assignment-submission-tile.component';

describe('AssignmentSubmissionTileComponent', () => {
  let component: AssignmentSubmissionTileComponent;
  let fixture: ComponentFixture<AssignmentSubmissionTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentSubmissionTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentSubmissionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
