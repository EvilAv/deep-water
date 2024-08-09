import { useEffect, useRef } from "react";
import { MAP_HEIGHT, MAP_WIDTH } from "../const";
import { drawMap } from "./drawMap";
import { store } from "../../../app/store";
import { selectCurrentPoint } from "../../../features/map-control/mapControlSlice";
import { selectMap } from "../../../features/map-generator/mapSlice";

export const useRequestFrame = (
    ref: React.RefObject<HTMLCanvasElement>,
) => {
    const requestRef = useRef<number>();
    const ctxRef = useRef<CanvasRenderingContext2D>();

    const animate = () => {
        const ctx = ctxRef.current;
        if (ctx) {
            ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
            // cause it returns completely new point (immutability, you know) with new ref, we cant use it from the outer scope
            // looks like also need to refactor, but now has no idea
            const currentPoint = selectCurrentPoint(store.getState());
            const map = selectMap(store.getState());
            if (map){
                drawMap(ctx, map, currentPoint);
            }
        }
        // to save current frame id, so we can cancel the proper one
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        // maybe its a little messy
        if (ref.current) {
            const ctx = ref.current.getContext("2d");
            if (ctx) {
                ctxRef.current = ctx;
            }
        }
        // if component unmount
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [ref]);
};
