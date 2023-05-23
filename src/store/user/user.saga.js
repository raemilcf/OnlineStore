import { takeLatest, put , call, all } from "redux-saga/effects";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, singOutUser } from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutStart, signOutSuccess, signUpFailed, signUpSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

//Sign in 
export function* getSnapshotFromUserAuth( userAuth, adtionalDetails ){
    try{
        //send fuction and then parameters 
        const userSnapshot = yield call(
            createUserDocumentFromAuth,  //send fuction 
            userAuth, //params
            adtionalDetails //params
        );
        yield put( signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) );
    }
    catch(error){
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try{
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    }
    catch ( error ){
        yield put(signInFailed(error));
         
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try{
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call( getSnapshotFromUserAuth, user);

    }
    catch ( error ){
        yield put(signInFailed(error));
    }

}

//SIGN UP - in firestore 
export function* signUp( { payload: { email, password, displayName } }){
    try{
        const { user } = yield call( createAuthUserWithEmailAndPassword, email, password);
        yield put( signUpSuccess( user, {displayName}) );   //is calling signInAfterSignUp
    }
    catch (error){
        yield put(signUpFailed(error));

    }
}

//log out 
export function* signOut(){
    try{
        yield call(singOutUser);
        yield put(signOutSuccess());
    }
    catch(error){
        yield put(signOutFailed(error));
    }
}



// determine whether the user is authenticated or not 
export function* isUserAuthenticated() {

    try{
        const userAuth = yield call(getCurrentUser);
        //return if user dont exist 
        if(!userAuth) return;

        //call function to create or update user data 
        yield call(getSnapshotFromUserAuth, userAuth);

    }catch (error){
        yield put(signUpFailed(error));
    }
}

//REGION -------------------CALL FROM USER.ACTION-------------------------------

//call from signUpSuccess 
export function* signInAfterSignUp( { payload: { user, adtionalDetails }}){
    yield takeLatest(getSnapshotFromUserAuth, user, adtionalDetails);
}

//google sign in 
export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle );
}

//for email and password
export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

//validate user login 
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

//SIGN UP 
export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}


export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}


export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

//END REGION

//DECLARE ALL MY GENERATION FUNCTION  stay listening for a call
export  function* userSagas() {

    yield all([ 
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess), 
        call(onSignOutStart)
    ]
    );
}