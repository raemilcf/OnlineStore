import { takeLatest, put , call, all } from "redux-saga/effects";
import { getCurrentUser } from "../../utils/firebase/firebase.utils";
import USER_ACTION_TYPES from "./user.types";


// determine whether the user is authenticated or not 
export function* isUserAuthenticated() {

    try{
        const userAuth = yield call(getCurrentUser);
        //return if user dont exist 
        if(!userAuth) return;

    }catch (error){

    }
}

//validate user login 
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, getCurrentUser);
}


export  function* userSagas() {

    yield all([])
}