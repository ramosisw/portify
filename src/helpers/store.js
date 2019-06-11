import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { config } from '../config';

const loggerMiddleware = config.isDevelopment ? createLogger() : null;

export const store = createStore(
    rootReducer,
    config.isDevelopment ? applyMiddleware(thunkMiddleware, loggerMiddleware) : applyMiddleware(thunkMiddleware)
);
