import { Tile } from "../../tile";

export const drawMap = (ctx: CanvasRenderingContext2D, map: Tile[][]) => {
    for (const line of map){
        for (const tile of line){
            drawTile(ctx, tile);
        }
    }
    strokeGrid(ctx, map[0][0].size, map.length);
}

const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile) => {
    if (tile.type === 'sea'){
        ctx.fillStyle = '#68a';
    } else if (tile.type === 'land'){
        ctx.fillStyle = '#000';
    }
    ctx.fillRect(tile.x, tile.y, tile.size, tile.size);
}

const strokeGrid = (ctx: CanvasRenderingContext2D, tileSize: number, mapSize: number) => {
    // mapSize - size in tiles
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1
    ctx.setLineDash([Math.floor(tileSize / 10), Math.floor(tileSize / 4)]);
    for (let i = 1; i < mapSize; i++){
        ctx.beginPath();
        ctx.moveTo(0, i * tileSize);
        ctx.lineTo(mapSize * tileSize, i * tileSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i * tileSize, 0);
        ctx.lineTo(i * tileSize, mapSize * tileSize);
        ctx.stroke();
    }
    
}