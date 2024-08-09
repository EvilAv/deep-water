import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Point } from "./camera";
import { RootState } from "../../app/store";

type mapControlState = {
    isPressed: boolean;
    pressedPoint: Point;
    currentPoint: Point;
    previousPoint: Point;
    // will be used for zoom
    // centerPoint: Point;
};

const initialState: mapControlState = {
    isPressed: false,
    pressedPoint: { x: 0, y: 0 },
    previousPoint: { x: 0, y: 0 },
    currentPoint: { x: 0, y: 0 },
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
            // the internet says that it is not such a good idea
            if (state.isPressed) {
                const mousePoint = action.payload;
                const deltaX = mousePoint.x - state.pressedPoint.x;
                const deltaY = mousePoint.y - state.pressedPoint.y;

                const newX = state.previousPoint.x - deltaX;
                const newY = state.previousPoint.y - deltaY;
                state.currentPoint = { x: newX, y: newY };
            }
        },
        endScroll: (state) => {
            // save new point
            state.isPressed = false;
            state.previousPoint = state.currentPoint;
        },
        resetControls: () => initialState,
    },
});

export const { startScroll, endScroll, scroll, resetControls } = mapControlSlice.actions;

export const selectCurrentPoint = (state: RootState) => state.mapControl.currentPoint;

export default mapControlSlice.reducer;
