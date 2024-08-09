import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Point } from "./camera/types";
import { act } from "react";
import { RootState } from "../../app/store";

type mapState = {
    isPressed: boolean;
    pressedPoint: Point;
    currentPoint: Point;
    previousPoint: Point;
    // will be used for zoom
    // centerPoint: Point;
};

const initialState: mapState = {
    isPressed: false,
    pressedPoint: { x: 0, y: 0 },
    previousPoint: { x: 0, y: 0 },
    currentPoint: { x: 0, y: 0 },
};

export const mapSlice = createSlice({
    // maybe should rename to "map-control"
    name: "map",
    initialState,
    reducers: {
        startScroll: (state, action: PayloadAction<Point>) => {
            state.isPressed = true;
            state.pressedPoint = action.payload;
        },
        scroll: (state, action: PayloadAction<Point>) => {
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
    },
});

export const { startScroll, endScroll, scroll } = mapSlice.actions;

export const selectCurrentPoint = (state: RootState) => state.map.currentPoint;

export default mapSlice.reducer;
