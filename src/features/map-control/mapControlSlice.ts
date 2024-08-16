import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Point, ShadowTile, getVisibleMap } from "./camera";
import { RootState } from "../../app/store";
import { NEGATIVE_BORDER_GAP, TILE_SIZE } from "./const";
import { MAP_SIZE } from "../map-generator";
import { MAP_HEIGHT, MAP_WIDTH } from "../../components/map/";

type mapControlState = {
    isPressed: boolean;
    pressedPoint: Point;
    currentPoint: Point;
    previousPoint: Point;
    // will be used for zoom
    // centerPoint: Point;
    zoomCoefficient: number;

    mapTileSize: number;
    mapWidth: number;
    mapHeight: number;
    visibleMap: ShadowTile[][];
};

const startPoint: Point = { x: 0, y: 0 };

const initialState: mapControlState = {
    isPressed: false,
    pressedPoint: startPoint,
    previousPoint: startPoint,
    currentPoint: startPoint,
    zoomCoefficient: 1,

    mapTileSize: MAP_SIZE, // why it is here?
    mapHeight: MAP_HEIGHT,
    mapWidth: MAP_WIDTH,
    visibleMap: getVisibleMap(
        startPoint,
        MAP_WIDTH,
        MAP_HEIGHT,
        TILE_SIZE,
        MAP_SIZE
    ),
};

export const mapControlSlice = createSlice({
    name: "map-control",
    initialState,
    reducers: {
        startScroll: (state, action: PayloadAction<Point>) => {
            state.isPressed = true;
            state.pressedPoint = action.payload;
        },
        scroll: (state, action: PayloadAction<Point>) => {
            // it foul all logs with scroll action >_<
            // the internet says that it is not such a good idea to use thunk here
            if (state.isPressed) {
                const mousePoint = action.payload;
                const deltaX = mousePoint.x - state.pressedPoint.x;
                const deltaY = mousePoint.y - state.pressedPoint.y;

                let newX = state.previousPoint.x - deltaX;
                if (newX < NEGATIVE_BORDER_GAP) {
                    newX = NEGATIVE_BORDER_GAP;
                }

                let newY = state.previousPoint.y - deltaY;
                if (newY < NEGATIVE_BORDER_GAP) {
                    newY = NEGATIVE_BORDER_GAP;
                }
                state.currentPoint = { x: newX, y: newY };
                state.visibleMap = getVisibleMap(
                    state.currentPoint,
                    state.mapWidth,
                    state.mapHeight,
                    TILE_SIZE,
                    state.mapTileSize
                );
            }
        },
        endScroll: (state) => {
            // save new point
            state.isPressed = false;

            let tempPoint = state.currentPoint;
            if (tempPoint.x < 0) {
                tempPoint.x = 0;
            }
            if (tempPoint.y < 0) {
                tempPoint.y = 0;
            }

            state.previousPoint = tempPoint;
            state.currentPoint = tempPoint;
            // to prevent not rendering some tiles because of border gap
            // TODO: make a better solution
            state.visibleMap = getVisibleMap(
                state.currentPoint,
                state.mapWidth,
                state.mapHeight,
                TILE_SIZE,
                state.mapTileSize
            );
        },
        resetControls: () => initialState,
    },
});

export const { startScroll, endScroll, scroll, resetControls } =
    mapControlSlice.actions;

export const selectCurrentPoint = (state: RootState) =>
    state.mapControl.currentPoint;
export const selectCurrentTileSize = (state: RootState) =>
    state.mapControl.zoomCoefficient * TILE_SIZE;
export const selectVisibleMap = (state: RootState) =>
    state.mapControl.visibleMap;

export default mapControlSlice.reducer;
