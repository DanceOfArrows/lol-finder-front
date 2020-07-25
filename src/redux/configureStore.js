import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import freeRotation from './freeRotation';
import app from './app';
import leaderboard from './leaderboard';
import search from './search';
import summonerInfo from './summonerInfo';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    freeRotation,
    app,
    leaderboard,
    summonerInfo,
    search,
});

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
};

export default configureStore;