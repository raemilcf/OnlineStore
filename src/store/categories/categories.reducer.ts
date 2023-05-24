import {  fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSucces } from "./categories.action";
import { AnyAction } from "redux";

import {  Category } from "./categories.types";


export type CategoriesState = {
    readonly categories : Category[];
    readonly isLoading : boolean;
    readonly error : Error | null;
}

export const CATEGORIES_INITIAL_STATE : CategoriesState= {
    categories : [],
    isLoading: false,
    error: null,
}

//the problem with discriminating union -> redux dont only pass this CategoryActiontype - it passess evereything 
//ts asume that categoryAction asumes all the actions 
export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action= {} as AnyAction //discriminating union
    ) : CategoriesState => {
        
        if(fetchCategoriesStart.match(action)){
            return { ...state, isLoading: true};
        }
        if(fetchCategoriesSucces.match(action)){
            return { ...state,  categories : action.payload,  isLoading: false};
        }
        if(fetchCategoriesFailed.match(action)){
            return { ...state,  error: action.payload, isLoading: false };
        }
        return state;



        // switch(action.type){
        //     //begining api request 
        //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
        //         return { ...state, isLoading: true};
        //     //got result of our request 
        //     case  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
        //         return { ...state,  isLoading: false, categories : action.payload};
        //     //if request failed then catch the error 
        //     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
        //         return { ...state, isLoading: false, error: action.payload };
        //     default : 
        //         return state;
        // }
};