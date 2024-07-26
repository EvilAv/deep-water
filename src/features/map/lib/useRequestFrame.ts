import { useEffect, useRef } from "react"
import { MAP_HEIGHT, MAP_WIDTH } from "../const";
import { drawMap } from "./drawMap";
import { Tile } from "../../tile";

export const useRequestFrame = (ref: React.RefObject<HTMLCanvasElement>, map: Tile[][]) => {
    const requestRef = useRef<number>();
    const ctxRef = useRef<CanvasRenderingContext2D>();
    let tileX = 0;
    
    const animate = () => {
        const ctx = ctxRef.current;
        if (ctx){
            ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
            drawMap(ctx, map);
            ctx.fillStyle = 'black';
            ctx.fillRect(tileX, 0, 50, 50);
            tileX++
        }
        // to save current frame id, so we can cancel the proper one
        requestRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        // maybe its a little messy
        if (ref.current){
            const ctx = ref.current.getContext('2d');
            if (ctx){
                ctxRef.current = ctx;
            }
        }
        // if component unmount
        return () => {
            if (requestRef.current){
                cancelAnimationFrame(requestRef.current)
            }
        };
    }, [ref, map])
}