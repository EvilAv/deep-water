import { TileType } from "./types";

export class Tile{
    type:TileType
    x: number;
    y: number;
    size: number;

    constructor(x: number, y: number, size: number, type?: TileType){
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type ?? 'sea';
    }
}