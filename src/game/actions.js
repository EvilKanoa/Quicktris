import {getSpeedDelay} from 'game/gameUtils';
import {getGame} from 'game/selectors';

export const addGame = (id, defaults) => ({
    type: 'ADD_GAME',
    id,
    defaults
});

export const removeGame = (id) => ({
    type: 'REMOVE_GAME',
    id
});

export const setGame = (id = 'main', data) => ({
    type: 'SET_GAME',
    id,
    data
});

export const resetGame = (id = 'main', defaults) => ({
    type: 'RESET_GAME',
    id,
    defaults
});

export const tickGame = (id = 'main') => ({
    type: 'TICK_GAME',
    id
});

export const moveFalling = (id = 'main', direction) => ({
    type: 'MOVE_FALLING',
    id,
    direction
});

export const dropFalling = (id = 'main') => ({
    type: 'DROP_FALLING',
    id
});

export const rotateFalling = (id = 'main', direction) => ({
    type: 'ROTATE_FALLING',
    id,
    direction
});

export const holdFalling = (id = 'main') => ({
    type: 'HOLD_FALLING',
    id
});

export const pauseGame = (id = 'main') => ({
    type: 'PAUSE_GAME',
    id
});

export const runGame = (id = 'main') => (dispatch) => {
    dispatch(setGame(id, { paused: false }));

    const runTick = () => (dispatch, getState) => {
        const game = getGame(getState(), id);
        if (game.paused) return;

        dispatch(tickGame(id));
        setTimeout(() => {
            dispatch(runTick());
        }, getSpeedDelay(game.speed));
    };

    dispatch(runTick());
};
