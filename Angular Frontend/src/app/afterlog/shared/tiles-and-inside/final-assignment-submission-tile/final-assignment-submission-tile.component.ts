import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-final-assignment-submission-tile',
  templateUrl: './final-assignment-submission-tile.component.html',
  styleUrl: './final-assignment-submission-tile.component.css'
})
export class FinalAssignmentSubmissionTileComponent {

  @Input() title: string = '';
  @Input() id: number = 0;
}
