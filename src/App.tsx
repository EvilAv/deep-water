import React, { useState } from "react";
import { FC } from "react";
import { Map } from "./features/map";
import { getMockMap } from "./features/map-generator";
// TODO: replace with redux
const generateMap = () => getMockMap(5, 80);

const App: FC = () => {
    // TODO: replace with redux
    const [map, setMap] = useState(generateMap());
    return (
        <>
            <Map map={map} />
            <div>
                <button
                    onClick={() => {
                        setMap(generateMap())
                    }}
                >
                    refresh
                </button>
            </div>
        </>
    );
};

export default App;
