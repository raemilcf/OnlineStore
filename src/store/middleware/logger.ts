import { Middleware } from "redux";
import { RootState } from "../store";

//reusable middleware 
//secuence of curry functions 
export const loggerMiddleware: Middleware<{}, RootState >= (store) => (next) => (action)=> {
    if(!action.type){
         return next(action);
    }
    // console.log('type', action.type);
    // console.log('payload', action.payload);
    // console.log('currentState', store.getState());
    next(action);// sync action
    //console.log('next state', store.getState());
} 