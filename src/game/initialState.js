import {generateNewGame} from 'game/gameUtils';

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

export default initialState;
