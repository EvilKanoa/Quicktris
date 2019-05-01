import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getGame, getGameRender} from 'game/selectors';
import {runGame} from 'game/actions';

import GameGrid from './GameGrid';
import GameController from './GameController';

class Game extends Component {
    componentDidMount() {
        this.props.runGame();
    }

    render() {
        const {height, gameRender} = this.props;

        return (
            <>
                <GameController
                    gameId='main'
                    allowRestart={true}
                    allowPause={true}
                    allowHold={true}
                />
                <GameGrid
                    height={height}
                    grid={gameRender}
                />
            </>
        );
    }
}

export default connect(
    (state) => ({
        game: getGame(state),
        gameRender: getGameRender(state)
    }),
    (dispatch) => bindActionCreators({ runGame }, dispatch)
)(Game);
