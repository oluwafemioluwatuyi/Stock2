import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';



//root 

const middlewares = [logger];

const composedEnchancer = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnchancer);