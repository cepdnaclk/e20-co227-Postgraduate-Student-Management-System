export interface Tile {
    type: string;
    title: string;
}
  
export interface Section {
    id: number;
    buttonName: string;
    tiles: Tile[];
}

export interface LoadingTile {
    id: number;
    type: string;
    title: string;
}

export interface LoadingSection {
    id: number;
    buttonName: string;
    loadingTiles: LoadingTile[];
}