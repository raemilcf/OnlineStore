//redux state
import {compose,createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import  storage  from 'redux-persist/lib/storage'

//choose redux thunk or redux saga, but not both
//import thunk  from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';


import { rootReducer }  from './root-reducer';


//create saga middleware 
const sagaMidleware = createSagaMiddleware();

//before an action hits the reducer it hits the reducer first 
//only run middleware when we are running in development
const middleWares = [process.env.NODE_ENV === 'development' &&  logger, sagaMidleware ].filter(Boolean);


//create persist to save data locally, so we can keep the current state of the browser on refresh
const persistConfig = {
     key: 'root',
     storage,
     whitelist : ['cart'] //already comes from firestore, only saves the checkout cart 
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//use redux dev tools, ONLY RUN ON DEV AND IF IT HAS CHROME EXTENSION REDUX DEV TOOLS

const composeEnhancers = (process.env.NODE_ENV ==='development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//spread in the apply middleware 
//compose - pas multiple functions 
//multiple enhancers the first is middleware
const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));


//root -reducer
export const store = createStore (
     persistedReducer,
     undefined,
     composedEnhancers 
);

//run redux saga, config and instaciar 
sagaMidleware.run(rootSaga);

export const persistor = persistStore(store);

//redux persist helps to save data in the browser even if you refesh your page 


//redux thunk-> actions that dispatch o fires from redux thunk (aka in the middleware)
//action driven flow 
//redux thunk receive actions that are fuctions and send it to a dispatch 
//abstract a code 



/*
REDUX SAGA 
ASYNC SIDE EFFECT OF REDUX 
ACTIONS HITS MIDDLEWARE BEFORE HIT REDUCER 
WHITH REDUX SAGA -> ACTIONS HIT REDUCER BEFORE HITTING SAGA 


*/