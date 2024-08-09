import { getRandomInt } from "../../../utils";
import { Tile } from "../tile";
import { createTile } from "../tile";

export const getMockMap = (size: number) => {
    const arr: Tile[][] = [];
    const islandX = getRandomInt(size)
    const islandY = getRandomInt(size)
    for (let y = 0; y < size; y++){
        arr.push([]);
        
        for (let x = 0; x < size; x++){
            if (x === islandX && y === islandY){
                arr[y].push(createTile(x, y, 'land'))
            } else {
                arr[y].push(createTile(x, y))
            }
        }
    }
    return arr;
}