import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Tile } from "./tile";
import { getMockMap } from "./lib/getMockMap";
import { MAP_SIZE } from "./const";

type mapState = {
    globalMap: Tile[][] | null;
    mapSize: number;
}

const initialState: mapState = {
    globalMap: null,
    mapSize: MAP_SIZE,
    // here will be island graph and megatiles or maybe graph should be in different slice?
}

export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        generateMap: (state) => {
            state.globalMap = getMockMap(state.mapSize);
        }
    }
});

export const { generateMap } = mapSlice.actions;

export const selectMap = (state: RootState) => state.map.globalMap;
export const selectMapSize = (state: RootState) => state.map.mapSize;

export default mapSlice.reducer;
