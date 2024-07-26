import { useEffect } from "react"
import { drawMap } from "./drawMap";
import { Tile } from "../../tile";

export const useCanvas = (ref: React.RefObject<HTMLCanvasElement>, map: Tile[][]) => {
    useEffect(() => {
        if (ref.current){
            const ctx = ref.current.getContext('2d');
            if (ctx){
                drawMap(ctx, map);
            }
        }
    }, [ref, map]);
}