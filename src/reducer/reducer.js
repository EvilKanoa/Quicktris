import React from 'react';

const initialState = {};

// selectors
export const getState = (state) => state;

// action-creators

// reducer
export default (state = initialState, { type, ...action }) => {
    switch (type) {
        default: return {
            ...state
        };
    }
};
