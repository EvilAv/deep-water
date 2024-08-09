import React, { useEffect } from "react";
import { FC } from "react";
import { Map } from "../components/map";
import { useDispatch } from "react-redux";
import { setMapSize, setTileSize, generateMap } from "../features/map-generator/mapSlice";
import { resetControls } from "../features/map-control/mapControlSlice";

const App: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMapSize(7));
        dispatch(setTileSize(80));
        dispatch(generateMap())
    }, []);

    return (
        <>
            <Map />
            <div>
                <button
                    onClick={() => {
                        dispatch(generateMap());
                        dispatch(resetControls())
                    }}
                >
                    refresh
                </button>
            </div>
        </>
    );
};

export default App;
