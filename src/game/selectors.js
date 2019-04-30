import {createSelector} from 'reselect';
import {addBlocks} from 'game/gameUtils';

export const getState = (state) => state.game;
export const getAllGames = (state) => getState(state).games;
export const getGame = (state, id = 'main') => getAllGames(state)[id];
export const getAllKeybindings = (state) => getState(state).keybindings;
export const getKeybindings = (state, id = 'main') => getAllKeybindings(state)[id];
export const getGameRender = createSelector(
    [getGame],
    (game) => game && addBlocks(game.grid, game.falling)
);
