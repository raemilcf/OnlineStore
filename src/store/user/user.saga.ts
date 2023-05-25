import { User } from "firebase/auth";
import { takeLatest, put , call, all } from "typed-redux-saga/macro";
import { AdditionalInformation, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, singOutUser } from "../../utils/firebase/firebase.utils";
import { EmailSignInStart, signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, SignUpStart, SignUpSuccess, signUpSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

//"typed-redux-saga/macro" we use macro to add the additional steps, 
//simplify the final actions 

//Sign in 
export function* getSnapshotFromUserAuth( userAuth : User , additionalDetails ?:AdditionalInformation ){
    try{
        //send fuction and then parameters 
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,  //send fuction 
            userAuth, //params
            additionalDetails //params
        );

        if(userSnapshot){
            yield* put( signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }) );
        }
    }
    catch(error){
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try{
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    }
    catch ( error ){
        yield* put(signInFailed(error as Error));
         
    }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try{
        const userCredential  = yield* call(signInAuthUserWithEmailAndPassword, email, password);

        //if userCredential is not null or undefined then get the userdata
        if(userCredential){
            const { user } = userCredential;
            yield* call( getSnapshotFromUserAuth, user);
        }

    }
    catch ( error ){
        yield* put(signInFailed(error as Error));
    }

}

//SIGN UP - in firestore 
export function* signUp( { payload: { email, password, displayName }  } : SignUpStart){
    try{
        const userCreated = yield* call( createAuthUserWithEmailAndPassword, email, password);

        if(userCreated){
            const { user } = userCreated;
            yield* put( signUpSuccess( user, {displayName}) );   //is calling signInAfterSignUp

        }
    }
    catch (error){
        yield* put(signUpFailed(error as Error));

    }
}

//log out 
export function* signOut(){
    try{
        yield* call(singOutUser);
        yield* put(signOutSuccess());
    }
    catch(error){
        yield* put(signOutFailed(error as Error));
    }
}



// determine whether the user is authenticated or not 
export function* isUserAuthenticated() {

    try{
        const userAuth = yield* call(getCurrentUser);
        //return if user dont exist 
        if(!userAuth) return;

        //call function to create or update user data 
        yield* call(getSnapshotFromUserAuth, userAuth);

    }catch (error){
        yield* put(signUpFailed(error as Error));
    }
}

//REGION -------------------CALL FROM USER.ACTION-------------------------------

//call from signUpSuccess 
export function* signInAfterSignUp( { payload: { user, additionalDetails }} : SignUpSuccess){
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

//google sign in 
export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle );
}

//for email and password
export function* onEmailSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

//validate user login 
export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

//SIGN UP 
export function* onSignUpStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}


export function* onSignUpSuccess(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}


export function* onSignOutStart(){
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

//END REGION

//DECLARE ALL MY GENERATION FUNCTION  stay listening for a call
export  function* userSagas() {

    yield* all([ 
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess), 
        call(onSignOutStart)
    ]
    );
}