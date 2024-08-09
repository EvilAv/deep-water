import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Point } from "./camera";
import { RootState } from "../../app/store";
import { NEGATIVE_BORDER_GAP, TILE_SIZE } from "./const";

type mapControlState = {
    isPressed: boolean;
    pressedPoint: Point;
    currentPoint: Point;
    previousPoint: Point;
    // will be used for zoom
    // centerPoint: Point;
    zoomCoefficient: number;
};

const initialState: mapControlState = {
    isPressed: false,
    pressedPoint: { x: 0, y: 0 },
    previousPoint: { x: 0, y: 0 },
    currentPoint: { x: 0, y: 0 },
    zoomCoefficient: 1,
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
                if (newX < NEGATIVE_BORDER_GAP){
                    newX = NEGATIVE_BORDER_GAP;
                }

                let newY = state.previousPoint.y - deltaY;
                if (newY < NEGATIVE_BORDER_GAP){
                    newY = NEGATIVE_BORDER_GAP;
                }
                state.currentPoint = { x: newX, y: newY };
            }
        },
        endScroll: (state) => {
            // save new point
            state.isPressed = false;

            let tempPoint = state.currentPoint;
            if (tempPoint.x < 0){
                tempPoint.x = 0;
            }
            if (tempPoint.y < 0){
                tempPoint.y = 0;
            }

            state.previousPoint = tempPoint;
            state.currentPoint = tempPoint;
        },
        resetControls: () => initialState,
    },
});

export const { startScroll, endScroll, scroll, resetControls } = mapControlSlice.actions;

export const selectCurrentPoint = (state: RootState) => state.mapControl.currentPoint;
export const selectCurrentTileSize = (state: RootState) => state.mapControl.zoomCoefficient * TILE_SIZE;

export default mapControlSlice.reducer;
