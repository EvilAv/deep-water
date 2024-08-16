import React, { useEffect } from "react";
import { FC } from "react";
import { Map } from "../components/map";
import { useDispatch } from "react-redux";
import { generateMap } from "../features/map-generator/mapSlice";
import { resetControls } from "../features/map-control/mapControlSlice";

const mapSize = 8;

const App: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(generateMap());
    }, []);

    return (
        <>
            <Map />
            <div>
                <button
                    onClick={() => {
                        dispatch(generateMap());
                        dispatch(resetControls());
                    }}
                >
                    refresh
                </button>
            </div>
        </>
    );
};

export default App;
