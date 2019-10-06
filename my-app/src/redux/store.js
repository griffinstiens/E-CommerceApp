import { createStore, applyMiddleware } from 'redux';
//add middleware to store so that when actions get fired or dispatched, we can catch them and display them
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [logger];
//...middlewares will spread in all values in the logger array and apply them as individual arguments in applyMiddleware()
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);


export default {store, persistor };












