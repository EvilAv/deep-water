import { useEffect } from "react"
import { Tile } from "../../../features/map-generator/tile";

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