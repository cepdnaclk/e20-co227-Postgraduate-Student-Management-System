import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResearchComponent } from './student-research.component';

describe('StudentResearchComponent', () => {
  let component: StudentResearchComponent;
  let fixture: ComponentFixture<StudentResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentResearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
