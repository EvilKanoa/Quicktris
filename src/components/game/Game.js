import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getGame, getKeybindings, setGame, resetGame} from'logic/reducer';

import GameGrid from './GameGrid';

const noop = () => {};

const generateQueue = (count = 9999) => Array(count)
    .fill(undefined)
    .map(() => {
        switch (Math.floor(Math.random() * 7)) {
            case 0: return 'T';
            case 1: return 'S';
            case 2: return 'Z';
            case 3: return 'J';
            case 4: return 'L';
            case 5: return 'I';
            case 6: return 'O';
        }
    });

const blockPieces = {
    'T0': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    'T1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: -1 }],
    'T2': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: +0 }],
    'T3': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'S0': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: +0 }],
    'S1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'S2': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: +0 }],
    'S3': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'Z0': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    'Z1': [{ x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'Z2': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    'Z3': [{ x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'J0': [{ x: +0, y: -2 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'J1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    'J2': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: +0 }],
    'J3': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +2, y: +0 }, { x: +2, y: -1 }],
    'L0': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: -2 }],
    'L1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +2, y: +0 }],
    'L2': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'L3': [{ x: +0, y: -1 }, { x: +1, y: -1 }, { x: +2, y: +0 }, { x: +2, y: -1 }],
    'I0': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +0, y: -3 }],
    'I1': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +2, y: +0 }, { x: +3, y: +0 }],
    'I2': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +0, y: -3 }],
    'I3': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +2, y: +0 }, { x: +3, y: +0 }],
    'O0': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'O1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'O2': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'O3': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
};

const getBlockPieces = ({ type, rotation, x, y }) =>
    (blockPieces[`${type}${rotation}`] || []).map(
        ({ x: xOffset, y: yOffset}) => ({
            x: x + xOffset,
            y: y + yOffset,
            type
        })
    );

const generateGrid = (original = null, ...blocks) => {
    const grid = original
        ? original.map((column) => [...column])
        : Array(10)
            .fill(undefined)
            .map(() => Array(20).fill(null));

    const addBlock = ({ type, rotation, x, y }) => {
        const pieces = blockPieces[`${type}${rotation}`];
        pieces && pieces.forEach(({ x: xOffset, y: yOffset }) => {
            grid[x + xOffset][y + yOffset] = type.toLowerCase();
        });
    };

    blocks.forEach(addBlock);
    return grid;
};

const isValidBlock = (block, grid) => !getBlockPieces(block)
    .some(({ x, y }) => x < 0 || x > 9 || y < 0 || (grid && grid[x][y]));

class Game extends Component {
    static propTypes = {
        height: PropTypes.number,
    };

    static defaultProps = {
        height: 600,
    };

    componentDidMount() {
        this.updateTick(null);
        window.addEventListener('keydown', this.onKeydown);
    }

    componentDidUpdate(prevProps) {
        this.updateTick(prevProps.game.speed);
    }

    controller = {
        move: (direction) => {
            const {falling, grid} = this.props.game;
            const newFalling = {
                ...falling,
                x: falling.x + (direction === 'right' ? +1 : -1)
            };
            if (isValidBlock(newFalling, grid)) {
                this.props.setGame({
                    falling: {
                        ...falling,
                        x: falling.x + (direction === 'right' ? +1 : -1)
                    }
                });
            }
        },
        slowDrop: () => {
            const {falling, grid} = this.props.game;

            const newFalling = {
                ...falling,
                y: falling.y - 1
            };
            if (isValidBlock(newFalling, grid) && isValidBlock(falling, grid)) {
                this.props.setGame({
                    falling: {
                        ...falling,
                        y: falling.y - 1
                    }
                });
            }
        },
        drop: () => {
            const {falling, grid} = this.props.game;
            const newFalling = { ...falling };

            if (!isValidBlock(newFalling, grid)) return;

            while (isValidBlock(newFalling, grid)) {
                newFalling.y--;
            }
            newFalling.y++;
            this.props.setGame({ falling: newFalling });
            this.tick();
        },
        rotate: (direction) => {
            const {falling, grid} = this.props.game;

            let rotation = falling.rotation + (direction === 'right' ? +1 : -1);
            if (rotation > 3) rotation = 0;
            else if (rotation < 0) rotation = 3;

            const newFalling = {
                ...falling,
                rotation
            };
            if (isValidBlock(newFalling, grid)) {
                this.props.setGame({
                    falling: {
                        ...falling,
                        rotation: rotation > 3 ? 0 : (rotation < 0 ? 3 : rotation)
                    }
                });
            }
        },
        hold: () => {

        },
        restart: () => {
            this.props.resetGame();
        }
    };

    onKeydown = ({ key }) => {
        const {keybindings} = this.props;
        switch (key) {
            case keybindings.moveLeft:
                this.controller.move('left');
                break;
            case keybindings.moveDown:
                this.controller.slowDrop();
                break;
            case keybindings.moveRight:
                this.controller.move('right');
                break;
            case keybindings.drop:
                this.controller.drop();
                break;
            case keybindings.rotateLeft:
                this.controller.rotate('left');
                break;
            case keybindings.rotateRight:
                this.controller.rotate('right');
                break;
            case keybindings.hold:
                this.controller.hold();
                break;
            case keybindings.restart:
                this.controller.restart();
                break;
            default: break;
        }
    };

    updateTick = (prevSpeed) => {
        const {speed} = this.props.game;
        if (prevSpeed === speed) return;

        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
        this.tickInterval = setInterval(this.tick, 1000 / speed);
    };

    tick = () => {
        const {falling, queue, grid} = this.props.game;
        const updateState = { grid };

        // check if block falls or stops
        const nextFalling = {
            ...falling,
            y: falling.y - 1
        };
        if (isValidBlock(nextFalling, grid)) {
            updateState.falling = {
                ...falling,
                y: falling.y - 1
            };
        } else {
            updateState.grid = generateGrid(grid, falling);
            if (falling.y === 20) {
                alert(`Game Over!`);
                this.controller.restart();
                return;
            } else {
                updateState.falling = {
                    type: queue.shift(),
                    rotation: 0,
                    x: 4,
                    y: 20
                };
            }
        }

        // check if any lines were completed
        for (let y = 19; y >= 0; y--) {
            let completed = true;
            for (let x = 0; x < 10; x++) {
                if (!updateState.grid[x][y]) {
                    completed = false;
                }
            }

            if (completed) {
                updateState.grid = updateState.grid.map((column) => {
                    const newColumn = [...column, null];
                    newColumn.splice(y, 1);
                    return newColumn;
                });
            }
        }

        this.props.setGame(updateState);
    };

    render() {
        const {height, game} = this.props;
        const grid = generateGrid(game.grid, game.falling);

        return (
            <GameGrid
                height={height}
                grid={grid}
            />
        );
    }
}

export default connect(
    (state) => ({
        game: getGame(state),
        keybindings: getKeybindings(state)
    }),
    (dispatch) => bindActionCreators({
        setGame: (game) => setGame('main', game),
        resetGame
    }, dispatch)
)(Game);
