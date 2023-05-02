//redux state
import {compose,createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer }  from './root-reducer';

//before an action hits the reducer it hits the reducer firts 
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

//spread in the apply middleware 
//compose - pas multiple functions 
//multiple enhancers the first is middleware
const composedEnhancers = compose(applyMiddleware(...middleWares));

//root -reducer
export const store = createStore (
     rootReducer,
     undefined,
     composedEnhancers 
);