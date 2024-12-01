import { Component, Input } from '@angular/core';
import { TileIdService } from '../../../services/tile-id.service';

@Component({
  selector: 'app-feedback-tile',
  templateUrl: './feedback-tile.component.html',
  styleUrl: './feedback-tile.component.css'
})
export class FeedbackTileComponent {
  @Input() title: string = '';
  @Input() id: number = 0;

}
