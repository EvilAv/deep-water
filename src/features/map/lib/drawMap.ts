import { Tile } from "../../tile";
import { Point } from "../camera/types";
export const drawMap = (ctx: CanvasRenderingContext2D, map: Tile[][], point: Point) => {
    for (const line of map){
        for (const tile of line){
            drawTile(ctx, tile, point);
        }
    }
    strokeGrid(ctx, map[0][0].size, map.length, point);
}

const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile, point: Point) => {
    if (tile.type === 'sea'){
        ctx.fillStyle = '#68a';
    } else if (tile.type === 'land'){
        ctx.fillStyle = '#000';
    }
    ctx.fillRect(tile.x - point.x, tile.y - point.y, tile.size, tile.size);
}

const strokeGrid = (ctx: CanvasRenderingContext2D, tileSize: number, mapSize: number, point: Point) => {
    // mapSize - size in tiles
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1
    // ctx.setLineDash([Math.floor(tileSize / 10), Math.floor(tileSize / 4)]);
    for (let i = 1; i < mapSize; i++){
        ctx.beginPath();
        ctx.moveTo(0, i * tileSize - point.y);
        ctx.lineTo(mapSize * tileSize, i * tileSize - point.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i * tileSize - point.x, 0);
        ctx.lineTo(i * tileSize - point.x, mapSize * tileSize);
        ctx.stroke();
    }
    
}