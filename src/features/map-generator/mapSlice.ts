import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Tile } from "./tile";
import { getMockMap } from "./lib/getMockMap";

type mapState = {
    globalMap: Tile[][] | null;
    mapSize: number;
}

const initialState: mapState = {
    globalMap: null,
    mapSize: 0,
}

export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setMapSize: (state, action: PayloadAction<number>) => {
            state.mapSize = action.payload;
        },
        generateMap: (state) => {
            state.globalMap = getMockMap(state.mapSize);
        }
    }
});

export const { setMapSize, generateMap } = mapSlice.actions;

export const selectMap = (state: RootState) => state.map.globalMap;

export default mapSlice.reducer;
