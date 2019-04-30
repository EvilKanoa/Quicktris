import React from 'react';

import useViewport from 'hooks/useViewport';
import Game from 'components/game/Game';

const App = () => {
    const {height} = useViewport();

    return (
        <div id="app">
            <Game height={height}/>
        </div>
    );
};

export default App;
