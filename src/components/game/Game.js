import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Game.scss';

const noop = () => {};

const keybindings = {
    moveLeft: 'ArrowLeft',
    moveDown: 'ArrowDown',
    moveRight: 'ArrowRight',
    drop: 'ArrowUp',
    rotateLeft: 'a',
    rotateRight: 's',
    hold: 'd',
    restart: 'Enter'
};

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

const generateGrid = (blocks, falling) => {
    const grid = Array(10)
        .fill(undefined)
        .map(() => Array(20).fill(null));

    const addBlock = ({ type, rotation, x, y }) => {
        const pieces = blockPieces[`${type}${rotation}`];
        pieces && pieces.forEach(({ x: xOffset, y: yOffset }) => {
            grid[x + xOffset][y + yOffset] = type.toLowerCase();
        });
    };

    blocks.forEach(addBlock);
    if (falling) addBlock(falling);
    // TODO: Add falling shadow block

    return grid;
};

const isValidBlock = (block, grid) => !getBlockPieces(block)
    .some(({ x, y }) => x < 0 || x > 9 || y < 0 || (grid && grid[x][y]));

const getNewGame = () => ({
    blocks: [],
    queue: generateQueue(),
    hold: null,
    falling: {
        type: generateQueue(1)[0],
        rotation: 0,
        x: 4,
        y: 20
    }
});

class Game extends Component {
    static propTypes = {
        controller: PropTypes.func,
        height: PropTypes.number,
        speed: PropTypes.number,
        useControls: PropTypes.bool,
    };

    static defaultProps = {
        controller: noop,
        height: 600,
        speed: 1,
        useControls: true,
    };

    constructor(props) {
        super(props);

        props.controller(this.controller);

        this.state = getNewGame();
    }

    componentDidMount() {
        this.updateTick(null);
        if (this.props.useControls) {
            window.addEventListener('keydown', this.onKeydown);
        }
    }

    componentDidUpdate(prevProps) {
        this.updateTick(prevProps.speed);
    }

    controller = {
        move: (direction) => {
            const {falling, blocks} = this.state;
            const newFalling = {
                ...falling,
                x: falling.x + (direction === 'right' ? +1 : -1)
            };
            if (isValidBlock(newFalling, generateGrid(blocks))) {
                this.setState({
                    falling: {
                        ...falling,
                        x: falling.x + (direction === 'right' ? +1 : -1)
                    }
                });
            }
        },
        slowDrop: () => {
            const {falling, blocks} = this.state;
            const grid = generateGrid(blocks);

            const newFalling = {
                ...falling,
                y: falling.y - 1
            };
            if (isValidBlock(newFalling, grid) && isValidBlock(falling, grid)) {
                this.setState({
                    falling: {
                        ...falling,
                        y: falling.y - 1
                    }
                });
            }
        },
        drop: () => {
            const {falling, blocks} = this.state;

            const grid = generateGrid(blocks);
            const newFalling = { ...falling };

            if (!isValidBlock(newFalling, grid)) return;

            while (isValidBlock(newFalling, grid)) {
                newFalling.y--;
            }
            newFalling.y++;
            this.setState({ falling: newFalling });
            this.tick();
        },
        rotate: (direction) => {
            const {falling, blocks} = this.state;

            let rotation = falling.rotation + (direction === 'right' ? +1 : -1);
            if (rotation > 3) rotation = 0;
            else if (rotation < 0) rotation = 3;

            const newFalling = {
                ...falling,
                rotation
            };
            if (isValidBlock(newFalling, generateGrid(blocks))) {
                this.setState({
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
            this.setState(getNewGame());
        }
    };

    updateTick = (prevSpeed) => {
        const {speed} = this.props;
        if (prevSpeed === speed) return;

        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
        this.tickInterval = setInterval(this.tick, 1000 / speed);
    };

    onKeydown = ({ key }) => {
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

    tick = () => {
        const {blocks, falling, queue} = this.state;
        const grid = generateGrid(blocks, false);
        const updateState = { blocks };

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
            updateState.blocks.push(falling);
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

        this.setState(updateState);
    };

    render() {
        const {height} = this.props;
        const {blocks, falling} = this.state;
        const grid = generateGrid(blocks, falling);

        return (
            <div
                className='game'
                style={{
                    width: `${(height / 22) * 12}px`,
                    height: `${height}px`
                }}
            >
                <div className='game-grid'>
                    <div className='grid-background'/>
                    {grid.flatMap((column, x) =>
                        column.map((type, y) => type && (
                            <div
                                className={`block ${type}-block`}
                                key={`${x},${y}`}
                                style={{
                                    gridColumnStart: x + 2,
                                    gridColumnEnd: x + 2,
                                    gridRowStart: 21 - y,
                                    gridRowEnd: 21 - y
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default Game;
