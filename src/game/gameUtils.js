export const blockOffsets = {
    't0': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    't1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: -1 }],
    't2': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: +0 }],
    't3': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    's0': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: +0 }],
    's1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    's2': [{ x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: +0 }],
    's3': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'z0': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    'z1': [{ x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'z2': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    'z3': [{ x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'j0': [{ x: +0, y: -2 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'j1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: -1 }, { x: +2, y: -1 }],
    'j2': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: +0 }],
    'j3': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +2, y: +0 }, { x: +2, y: -1 }],
    'l0': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: -2 }],
    'l1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +2, y: +0 }],
    'l2': [{ x: +0, y: +0 }, { x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }],
    'l3': [{ x: +0, y: -1 }, { x: +1, y: -1 }, { x: +2, y: +0 }, { x: +2, y: -1 }],
    'i0': [{ x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }, { x: +1, y: -3 }],
    'i1': [{ x: +0, y: -1 }, { x: +1, y: -1 }, { x: +2, y: -1 }, { x: +3, y: -1 }],
    'i2': [{ x: +1, y: +0 }, { x: +1, y: -1 }, { x: +1, y: -2 }, { x: +1, y: -3 }],
    'i3': [{ x: +0, y: -1 }, { x: +1, y: -1 }, { x: +2, y: -1 }, { x: +3, y: -1 }],
    'o0': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'o1': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'o2': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
    'o3': [{ x: +0, y: +0 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +1, y: -1 }],
};

export const randomBlock = () => {
    switch (Math.floor(Math.random() * 7)) {
        case 0: return 't';
        case 1: return 's';
        case 2: return 'z';
        case 3: return 'j';
        case 4: return 'l';
        case 5: return 'i';
        case 6: return 'o';
        default: return null;
    }
};

export const getSpeedDelay = (speed) => 1000 / Math.pow(2, speed - 1);

export const generateQueue = (count = 999) => Array(count)
    .fill(undefined)
    .map(randomBlock);

export const generateNewGame = (defaults = {}) => ({
    grid: Array(10)
        .fill(undefined)
        .map(() => Array(20).fill(null)),
    queue: generateQueue(),
    hold: null,
    falling: {
        type: randomBlock(),
        rotation: 0,
        x: 4,
        y: 20
    },
    speed: 1,
    clears: {
        singles: 0,
        doubles: 0,
        triples: 0,
        tetrises: 0,
        miniSpins: 0,
        singleSpins: 0,
        doubleSpins: 0,
        tripleSpins: 0,
        backToBacks: 0,
        allClears: 0
    },
    paused: true,
    ...defaults
});

export const cloneGrid = (grid) => grid.map((column) => [...column]);

export const getBlockOffsets = ({ type, rotation }) =>
    blockOffsets[`${type}${rotation}`] || [];

export const getBlockPieces = ({ x, y, ...block }) =>
    getBlockOffsets(block).map(({ x: xOffset, y: yOffset }) => ({
        x: x + xOffset,
        y: y + yOffset,
        type: block.type
    }));

export const isCollision = (block, grid) => getBlockPieces(block)
    .some(({ x, y }) => x < 0 || x > 9 || y < 0 || (grid && grid[x][y]));

export const addBlocks = (grid = [], ...blocks) => {
    grid = cloneGrid(grid);

    const addBlock = (block) => getBlockPieces(block)
        .forEach(({ x, y, type }) => {
            grid[x][y] = type;
        });

    blocks.forEach(addBlock);
    return grid;
};

export const move = (game, direction) => {
    const {falling, grid} = game;

    const newFalling = direction === 'down' ? {
        ...falling,
        y: falling.y - 1
    } : {
        ...falling,
        x: falling.x + (direction === 'right' ? +1 : -1)
    };

    if (isCollision(newFalling, grid) || isCollision(falling, grid)) {
        return game;
    } else {
        return {
            ...game,
            falling: newFalling
        }
    }
};

export const drop = (game) => {
    const {falling, grid} = game;
    const newFalling = { ...falling };

    do {
        newFalling.y--;
    } while (!isCollision(newFalling, grid));
    newFalling.y++;

    return applyGameTick({
        ...game,
        falling: newFalling
    });
};

export const rotate = (game, direction) => {
    const {falling, grid} = game;

    let rotation = falling.rotation + (direction === 'right' ? +1 : -1);
    if (rotation > 3) rotation = 0;
    else if (rotation < 0) rotation = 3;

    const newFalling = { ...falling, rotation };
    const newFallingLeft1 = { ...newFalling, x: newFalling.x - 1 };
    const newFallingLeft2 = { ...newFalling, x: newFalling.x - 2 };
    const newFallingRight = { ...newFalling, x: newFalling.x + 1 };

    let updateFalling = falling;
    if (!isCollision(newFalling, grid)) {
        updateFalling = newFalling;
    } else if (!isCollision(newFallingLeft1, grid)) {
        updateFalling = newFallingLeft1;
    } else if (!isCollision(newFallingRight, grid)) {
        updateFalling = newFallingRight;
    } else if (!isCollision(newFallingLeft2, grid)) {
        updateFalling = newFallingLeft2;
    }

    return {
        ...game,
        falling: updateFalling
    };
};

export const hold = (game) => {
    return game;
};

export const applyGravity = (game) => {
    if (!game) return undefined;

    let {grid, falling, queue} = game;

    // check if block falls or stops
    const nextFalling = {
        ...falling,
        y: falling.y - 1
    };
    if (isCollision(nextFalling, grid) || !falling) {
        grid = addBlocks(grid, falling);

        if (falling.y === 20) {
            alert(`Game Over!`);
            // TODO: Determine flow for end game
            return { ...game, paused: true };
        }

        falling = {
            type: queue.pop(),
            rotation: 0,
            x: 4,
            y: 20
        };

        if (queue.length < 99) {
            queue = [generateQueue(), ...queue];
        }
    } else {
        falling = nextFalling;
    }

    return { ...game, grid, falling, queue };
};

export const clearLines = (grid) => {
    grid = cloneGrid(grid);

    // check if any lines were completed
    for (let y = 19; y >= 0; y--) {
        let completed = true;
        for (let x = 0; x < 10; x++) {
            if (!grid[x][y]) {
                completed = false;
            }
        }

        if (completed) {
            grid = grid.map((column) => {
                const newColumn = [...column, null];
                newColumn.splice(y, 1);
                return newColumn;
            });
        }
    }

    return grid;
};

export const applyGameTick = (game) => {
    if (!game) return undefined;

    game = {...game};
    game = applyGravity(game);
    game.grid = clearLines(game.grid);

    return game;
};
