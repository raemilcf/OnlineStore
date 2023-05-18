import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
    categories : [],
    isLoading: false,
    error: null,
}


export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action= {}
    ) => {
        const { type , payload } = action;
        
        switch(type){
            //begining api request 
            case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
                return { ...state, isLoading: true};
            //got result of our request 
            case  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
                return { ...state,  isLoading: false, categories : payload};
            //if request failed then catch the error 
            case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
                return { ...state, isLoading: false, error: payload };
            default : 
                return state;
        }
}