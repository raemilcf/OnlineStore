//redux state
import {compose,createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer }  from './root-reducer';


//reusable middleware 
//secuence of curry functions 
const loggerMiddleware = (store) => (next) => (action)=> {
     if(!action.type){
          return next();
     }
     // console.log('type', action.type);
     // console.log('payload', action.payload);
     // console.log('currentState', store.getState());
     next(action);// sync action
     //console.log('next state', store.getState());
} 
//before an action hits the reducer it hits the reducer first 
const middleWares = [loggerMiddleware];



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