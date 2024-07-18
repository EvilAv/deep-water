import React, {FC, useState} from 'react';

const App: FC = () => {

    const [cnt, setCnt] = useState(0);

    const handleClick = () => {
        setCnt(cnt + 1);
    }

    return (
        <div>
            <div>{cnt}</div>
            <button onClick={handleClick}>click me!</button>
        </div>
    )
}

export default App;