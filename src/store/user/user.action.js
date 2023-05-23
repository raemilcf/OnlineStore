import  { USER_ACTION_TYPES } from './user.types'
//declare all the data modification you pretend to do to the object
import { createAction } from '../../utils/reducer/reducer.util';


 //update current user 

 //every action goes to user.saga once is called
 export const setCurrentUser = (user) =>  createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user);

  export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

  
  export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

  export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

  export const signInSuccess = (user) =>  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

  export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

  //calls user.saga by type
  export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });

  //call from within user.saga, to return result of sign up, this one does not go to the reducer, instead it goes to user.saga
  export const signUpSuccess = ( user, additionalDetails ) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

  export const signUpFailed = ( error ) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);


  export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

  export const signOutSuccess = () =>createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS); // this is equal  ({ type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS, payload: null }); // 

  export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

