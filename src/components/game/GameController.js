import React, {useEffect} from 'react';
import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {
    getKeybindings,
    getGame
} from 'game/selectors';
import {
    moveFalling,
    dropFalling,
    rotateFalling,
    holdFalling,
    resetGame,
    runGame,
    pauseGame
} from 'game/actions';

const getNormalizedBindings = createSelector(
    [getKeybindings],
    (bindings) => Object
        .keys(bindings)
        .reduce((normalized, bind) => {
            normalized[bind] = bindings[bind].toLowerCase();
            return normalized;
        }, {})
);

const GameController = connect(
    (state, { gameId }) => ({
        keybindings: getNormalizedBindings(state, gameId),
        paused: getGame(state, gameId).paused
    }),
    (dispatch, { gameId }) => bindActionCreators({
        move: (direction) => moveFalling(gameId, direction),
        drop: () => dropFalling(gameId),
        rotate: (direction) => rotateFalling(gameId, direction),
        hold: () => holdFalling(gameId),
        reset: () => resetGame(gameId),
        run: () => runGame(gameId),
        pause: () => pauseGame(gameId)
    }, dispatch)
)(({
    allowRestart = false,
    allowPause = false,
    allowHold = true,
    keybindings,
    paused,
    move,
    drop,
    rotate,
    hold,
    reset,
    run,
    pause
 }) => {
    const onKeydown = ({ key }) => {
        if (!key || !keybindings) return;

        switch (key.toLowerCase()) {
            case keybindings.moveLeft: return move('left');
            case keybindings.moveDown: return move('down');
            case keybindings.moveRight: return move('right');
            case keybindings.drop: return drop();
            case keybindings.rotateLeft: return rotate('left');
            case keybindings.rotateRight: return rotate('right');
            case keybindings.hold: return allowHold && hold();
            case keybindings.restart: return allowRestart && reset();
            case keybindings.pause: return allowPause && paused
                ? run()
                : pause();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeydown);
        return () => window.removeEventListener('keydown', onKeydown);
    });

    return null;
});

GameController.propTypes = {
    gameId: PropTypes.string.isRequired,
    allowRestart: PropTypes.bool,
    allowPause: PropTypes.bool,
    allowHold: PropTypes.bool
};

export default GameController;
