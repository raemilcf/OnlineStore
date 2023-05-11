import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSucces, fetchCategoriesFailed } from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';



export function* fetchCategoriesStartAsync() {

    try{
        const categories = yield call( getCategoriesAndDocuments, 'categories' ); //with yield we will wait until we got the response
        //we dont use dispatch instead we use yield put to execute the function
        yield put(fetchCategoriesSucces(categories));
    }catch (error){
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories(){
    //if theres a lot of result just take the last 
    yield takeLatest( CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesStartAsync  ) 
}

//generator function 
export function* categoriesSaga() {

    //listen for our fetch categories -> request
    yield all([call(onFetchCategories)]); //run everything inside and only stop when everything runs 

}
