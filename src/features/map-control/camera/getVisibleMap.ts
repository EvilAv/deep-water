import { Point, ShadowTile } from "./types";


// it works fine with map size about 20, maybe it's not the best optimization way
export const getVisibleMap = (
    currentPoint: Point, // top left visible point
    width: number,
    height: number,
    tileSize: number,
    mapSize: number
) => {
    const res: ShadowTile[][] = [];
    for (let y = 0; y < mapSize; y++) {
        // use y + 1 / x + 1 because tile has its width and height
        const tileBottomBorder = (y + 1) * tileSize;
        
        if (tileBottomBorder - currentPoint.y < 0) {
            continue;
        }

        res.push([]);
        for (let x = 0; x < mapSize; x++) {
            const tileRightBorder = (x + 1) * tileSize;

            if (tileRightBorder - currentPoint.x < 0){
                continue;
            }

            res[res.length - 1].push({x, y})
            if (tileRightBorder - currentPoint.x >= width){
                break;
            }
        }
        if (tileBottomBorder - currentPoint.y >= height){
            break;
        }
    }
    return res;
};
