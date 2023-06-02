import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.util";

//convert to ts
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher(
     () : FetchCategoriesStart => 
    createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START )
);


export const fetchCategoriesSucces =withMatcher( 
     (categoriesArray : Category[]) : FetchCategoriesSuccess => 
    createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray )
);


export const fetchCategoriesFailed = withMatcher(
     (error : Error) : FetchCategoriesFailed => 
    createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error )
);



// import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

//action driven architecture
//sync calls
//starting to fetch categories 
// export const fetchCategoriesStart = () => 
//     createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START );


//report suscces with data 
// export const fetchCategoriesSucces = (categoriesArray) => 
//     createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray );


// //report error with correponding error 
// export const fetchCategoriesFailed = (error) => 
//     createAction( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error );


// //by convention at the end is called async
// //this is our thunk
// export const fetchCategoriesStartAsync = () => {
//     //start request 
//    return async (dispatch) => {
//     dispatch(fetchCategoriesStart());

//     try{
//         const categories = await getCategoriesAndDocuments('categories');
//         console.log("categories", categories);
//         //send the result to update states 
//         dispatch(fetchCategoriesSucces(categories));
//     }catch (error){
//         dispatch(fetchCategoriesFailed(error));
//     }
//    };
// };
