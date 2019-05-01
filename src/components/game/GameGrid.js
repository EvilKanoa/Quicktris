import React from 'react';
import {defaultMemoize} from 'reselect';
import PropTypes from 'prop-types';

import './GameGrid.scss';

const renderGrid = defaultMemoize(
    (grid) => grid.flatMap(
        (column, x) => column.map(
            (type, y) => (
                <div
                    className={`grid-block grid-block-${type || 'background'}`}
                    key={`${x},${y}`}
                    style={{
                        gridColumnStart: x + 1,
                        gridColumnEnd: x + 1,
                        gridRowStart: 20 - y,
                        gridRowEnd: 20 - y
                    }}
                />
            )
        )
    )
);

const GameGrid = ({ height = 600, grid }) => (
    <div
        className='game-grid'
        style={{
            width: `${height / 2}px`,
            height: `${height}px`
        }}
    >
        {renderGrid(grid)}
    </div>
);

GameGrid.propTypes = {
    height: PropTypes.number,
    grid: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default GameGrid;
