import { Component, Input } from '@angular/core';
import { TileIdService } from '../../../services/tile-id.service';

@Component({
  selector: 'app-assignment-submission-tile',
  templateUrl: './assignment-submission-tile.component.html',
  styleUrl: './assignment-submission-tile.component.css'
})
export class AssignmentSubmissionTileComponent {

  @Input() title: string = '';
  @Input() id: number = 0;

}
