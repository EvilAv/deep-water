import React, { useEffect, useRef } from "react";
import { FC, useState } from "react";
import { MAP_HEIGHT, MAP_WIDTH } from "./const";
import { useCanvas } from "./lib/useCanvas";

const Map: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useCanvas(canvasRef);

    return <canvas ref={canvasRef} width={MAP_WIDTH} height={MAP_HEIGHT}/>;
};

export default Map;
