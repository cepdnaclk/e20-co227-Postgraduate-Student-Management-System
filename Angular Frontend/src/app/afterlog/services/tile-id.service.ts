import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TileIdService {

  private selectedTileId: number | null = null;

  // Method to set the tile ID
  setTileId(id: number): void {
    this.selectedTileId = id;
  }

  // Method to get the tile ID
  getTileId(): number | null {
    return this.selectedTileId;
  }

  // Method to clear the tile ID
  clearTileId(): void {
    this.selectedTileId = null;
  }
}
