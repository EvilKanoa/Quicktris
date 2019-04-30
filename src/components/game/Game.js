import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getGame, getGameRender, getKeybindings} from 'game/selectors';
import {setGame, resetGame, tickGame, moveFalling, dropFalling, rotateFalling} from 'game/actions';

import GameGrid from './GameGrid';

class Game extends Component {
    componentDidMount() {
        this.updateTick(null);
        window.addEventListener('keydown', this.onKeydown);
    }

    componentDidUpdate(prevProps) {
        this.updateTick(prevProps.game.speed);
    }

    updateTick = (prevSpeed) => {
        const {speed} = this.props.game;
        if (prevSpeed === speed) return;

        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
        this.tickInterval = setInterval(this.props.tickGame, 1000 / speed);
    };

    onKeydown = ({ key }) => {
        const {keybindings} = this.props;
        switch (key) {
            case keybindings.moveLeft:
                this.props.moveFalling('left');
                break;
            case keybindings.moveDown:
                this.props.moveFalling('down');
                break;
            case keybindings.moveRight:
                this.props.moveFalling('right');
                break;
            case keybindings.drop:
                this.props.dropFalling();
                break;
            case keybindings.rotateLeft:
                this.props.rotateFalling('left');
                break;
            case keybindings.rotateRight:
                this.props.rotateFalling('right');
                break;
            case keybindings.hold:
                //this.props.hold();
                break;
            case keybindings.restart:
                this.props.resetGame();
                break;
            default: break;
        }
    };

    render() {
        const {height, gameRender} = this.props;

        return (
            <GameGrid
                height={height}
                grid={gameRender}
            />
        );
    }
}

export default connect(
    (state) => ({
        game: getGame(state),
        gameRender: getGameRender(state),
        keybindings: getKeybindings(state)
    }),
    (dispatch) => bindActionCreators({
        setGame: (game) => setGame('main', game),
        moveFalling: (direction) => moveFalling('main', direction),
        rotateFalling: (direction) => rotateFalling('main', direction),
        dropFalling,
        resetGame,
        tickGame
    }, dispatch)
)(Game);
