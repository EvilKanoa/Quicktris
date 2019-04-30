import React from 'react';
import {generateNewGame} from 'logic/gameUtils';

const initialState = {
    games: {
        main: generateNewGame()
    },
    keybindings: {
        main: {
            moveLeft: 'ArrowLeft',
            moveDown: 'ArrowDown',
            moveRight: 'ArrowRight',
            drop: 'ArrowUp',
            rotateLeft: 'a',
            rotateRight: 's',
            hold: 'd',
            restart: 'Enter'
        }
    }
};

// selectors
export const getState = (state) => state;
export const getAllGames = (state) => state.games;
export const getGame = (state, id = 'main') => getAllGames(state)[id];
export const getAllKeybindings = (state) => state.keybindings;
export const getKeybindings = (state, id = 'main') => getAllKeybindings(state)[id];

// action-creators
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

// reducer
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

        default: return {
            ...state
        };
    }
};
