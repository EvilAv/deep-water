import { getRandomInt } from "../../utils";
import { Tile } from "../tile/Tile";

export const getMockMap = (size: number, tileSize: number) => {
    const arr: Tile[][] = [];
    const islandX = getRandomInt(size)
    const islandY = getRandomInt(size)
    for (let y = 0; y < size; y++){
        arr.push([]);
        for (let x = 0; x < size; x++){
            if (x === islandX && y === islandY){
                arr[y].push(new Tile(x * tileSize, y * tileSize, tileSize, 'land'))
            } else {
                arr[y].push(new Tile(x * tileSize, y * tileSize, tileSize))
            }
        }
    }
    return arr;
}