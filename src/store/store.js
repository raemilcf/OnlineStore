//redux state
import {compose,createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk  from 'redux-thunk';


import { rootReducer }  from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import  storage  from 'redux-persist/lib/storage'




//before an action hits the reducer it hits the reducer first 
//only run middleware when we are running in development
const middleWares = [process.env.NODE_ENV === 'development' &&  logger, thunk, ].filter(Boolean);


//create persist to save data locally, so we can keep the current state of the browser on refresh
const persistConfig = {
     key: 'root',
     storage,
     blacklist : ['user'] //already comes from firestore
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

export const persistor = persistStore(store);

//redux persist helps to save data in the browser even if you refesh your page 


//redux thunk-> actions that dispatch o fires from redux thunk (aka in the middleware)
//action driven flow 
//redux thunk receive actions that are fuctions and send it to a dispatch 
//abstract a code 
/*

*/