import React, { useRef } from "react";
import { FC } from "react";
import { MAP_HEIGHT, MAP_WIDTH } from "./const";
import { Tile } from "../tile";
import { useRequestFrame } from "./lib/useRequestFrame";
import { Point } from "./camera/types";

// TODO: replace with redux map props
export const Map: FC<{ map: Tile[][] }> = ({ map }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // TODO: add redux to remove this mess
    const isPressed = useRef<boolean>(false);
    const pressedPoint = useRef<Point>({ x: 0, y: 0 });
    const newPoint = useRef<Point>({ x: 0, y: 0 });
    const previousPoint = useRef<Point>({ x: 0, y: 0 });
    
    useRequestFrame(canvasRef, map, newPoint.current);
    const handleMouseDown = (event: React.MouseEvent) => {
        isPressed.current = true;
        pressedPoint.current.x = event.clientX;
        pressedPoint.current.y = event.clientY;
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isPressed.current) {
            newPoint.current.x =
                previousPoint.current.x -
                (event.clientX - pressedPoint.current.x);
            newPoint.current.y =
                previousPoint.current.y -
                (event.clientY - pressedPoint.current.y);
        }
    };

    const handleMouseUp = () => {
        isPressed.current = false;
        previousPoint.current.x = newPoint.current.x;
        previousPoint.current.y = newPoint.current.y;
    };

    return (
        <canvas
            ref={canvasRef}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            // TODO: choose a better naming
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        />
    );
};
