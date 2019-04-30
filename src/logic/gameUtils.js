export const blockOffsets = {
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

export const randomBlock = () => {
    switch (Math.floor(Math.random() * 7)) {
        case 0: return 'T';
        case 1: return 'S';
        case 2: return 'Z';
        case 3: return 'J';
        case 4: return 'L';
        case 5: return 'I';
        case 6: return 'O';
        default: return null;
    }
};

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
    ...defaults
});
