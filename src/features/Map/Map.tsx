import React, { useRef } from "react";
import { FC } from "react";
import { MAP_HEIGHT, MAP_WIDTH } from "./const";
import { Tile } from "../tile/tile";
import { useRequestFrame } from "./lib/useRequestFrame";

// TODO: replace with redux map props
export const Map: FC<{map: Tile[][]}> = ({map}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useRequestFrame(canvasRef, map);

    return <canvas ref={canvasRef} width={MAP_WIDTH} height={MAP_HEIGHT} />;
};
