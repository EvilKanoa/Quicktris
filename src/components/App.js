import React, {PureComponent} from 'react';

import Game from 'components/game/Game';

class App extends PureComponent {
    render() {
        return (
            <div id="app">
                <Game/>
            </div>
        );
    }
}

export default App;
