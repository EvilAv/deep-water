import React, { useRef } from "react";
import { FC } from "react";
import { MAP_HEIGHT, MAP_WIDTH } from "./const";
import { useRequestFrame } from "./lib/useRequestFrame";
import { useDispatch } from "react-redux";
import { startScroll, scroll, endScroll } from "../../features/map-control/mapControlSlice";

import './style.css'

export const Map: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dispatch = useDispatch();

    useRequestFrame(canvasRef);

    const handleMouseDown = (event: React.MouseEvent) => {
        dispatch(startScroll({ x: event.clientX, y: event.clientY }));
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        dispatch(scroll({ x: event.clientX, y: event.clientY }));
    };

    return (
        <canvas
            ref={canvasRef}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => dispatch(endScroll())}
            onMouseLeave={() => dispatch(endScroll())}
        />
    );
};
