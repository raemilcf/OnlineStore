import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSucces, fetchCategoriesFailed } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

//yield* will tell us the aproppiate type errors we might find in our calls 
//yield* allow us to execute each step of our generator 

//yield -> return value directly to your generator 
//yield* -> lets you delegate the value generation to another generator 
//use yield* for preformance and type resolution

export function* fetchCategoriesStartAsync() {

    try{
        const categories = yield* call( getCategoriesAndDocuments); //with yield we will wait until we got the response
        //we dont use dispatch instead we use yield put to execute the function
        yield* put(fetchCategoriesSucces(categories));
    }catch (error){
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories(){
    //if theres a lot of result just take the last 
    yield* takeLatest( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesStartAsync  ) 
}

//generator function 
export function* categoriesSaga() {

    //listen for our fetch categories -> request
    yield* all([call(onFetchCategories)]); //run everything inside and only stop when everything runs 

}
