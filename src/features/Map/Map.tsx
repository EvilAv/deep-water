import React, { useRef } from "react";
import { FC } from "react";
import { MAP_HEIGHT, MAP_WIDTH } from "./const";
import { Tile } from "../tile";
import { useRequestFrame } from "./lib/useRequestFrame";
import { Point } from "./camera/types";
import { useSelector, useDispatch } from "react-redux";
import { startScroll, endScroll, scroll } from "./mapSlice";
import { selectCurrentPoint } from "./mapSlice";

// TODO: replace with redux map props
export const Map: FC<{ map: Tile[][] }> = ({ map }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dispatch = useDispatch();

    useRequestFrame(canvasRef, map);

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
