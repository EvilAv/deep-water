import { TileType, Tile } from "./types";

export const createTile = (x: number, y: number, type?: TileType): Tile => {
    return {
        x,
        y,
        type: type ?? 'sea',
    }
}