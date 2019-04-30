import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import gameReducer from 'game/reducer';

let middleware = applyMiddleware(thunk);
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(combineReducers({
    game: gameReducer
}), middleware);

export default store;
