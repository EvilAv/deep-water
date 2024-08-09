import React, { useEffect } from "react";
import { FC } from "react";
import { Map } from "../components/map";
import { useDispatch } from "react-redux";
import { setMapSize, generateMap } from "../features/map-generator/mapSlice";
import {
    resetControls,
    setMapSize as setControlSize,
} from "../features/map-control/mapControlSlice";

const mapSize = 8;

const App: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMapSize(mapSize));
        dispatch(generateMap());
        dispatch(setControlSize(mapSize));
    }, []);

    return (
        <>
            <Map />
            <div>
                <button
                    onClick={() => {
                        dispatch(generateMap());
                        dispatch(resetControls());
                        dispatch(setControlSize(mapSize));
                    }}
                >
                    refresh
                </button>
            </div>
        </>
    );
};

export default App;
