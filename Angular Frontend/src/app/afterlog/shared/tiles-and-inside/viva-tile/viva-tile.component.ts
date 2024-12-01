import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-viva-tile',
  templateUrl: './viva-tile.component.html',
  styleUrl: './viva-tile.component.css'
})
export class VivaTileComponent {

  @Input() title: string = '';
  @Input() id: number = 0;

}
