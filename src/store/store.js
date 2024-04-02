import {compose, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from  'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV ==='development' && logger,
 sagaMiddleware].filter(Boolean);

const composedEnchancer = (process.env.NODE_ENV !== 'production' &&
 window &&
 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)|| compose;

const composedEnchancers = composedEnchancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnchancers);

sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);