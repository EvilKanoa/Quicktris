import React from 'react';
import initialState from 'game/initialState';
import {
    generateNewGame,
    applyGameTick,
    move,
    drop,
    rotate,
    hold
} from 'game/gameUtils';

export default (state = initialState, { type, ...action }) => {
    switch (type) {
        case 'ADD_GAME': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: state.games[action.id] || generateNewGame(action.defaults)
            }
        };

        case 'REMOVE_GAME': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: undefined
            }
        };

        case 'SET_GAME': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: {
                    ...state.games[action.id],
                    ...action.data
                }
            }
        };

        case 'RESET_GAME': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: state.games[action.id]
                    ? generateNewGame(action.defaults)
                    : undefined
            }
        };

        case 'TICK_GAME': return {
            ...state,
            games: {
                ...state.games,
                // TODO: Handle game over
                [action.id]: applyGameTick(state.games[action.id]) || generateNewGame()
            }
        };

        case 'PAUSE_GAME': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: state.games[action.id] && {
                    ...state.games[action.id],
                    paused: true
                }
            }
        };

        case 'MOVE_FALLING': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: state.games[action.id]
                    && move(state.games[action.id], action.direction)
            }
        };

        case 'DROP_FALLING': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: state.games[action.id] && drop(state.games[action.id])
            }
        };

        case 'ROTATE_FALLING': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: state.games[action.id]
                    && rotate(state.games[action.id], action.direction)
            }
        };

        case 'HOLD_FALLING': return {
            ...state,
            games: {
                ...state.games,
                [action.id]: state.games[action.id] && hold(state.games[action.id])
            }
        };

        default: return {
            ...state
        };
    }
};
