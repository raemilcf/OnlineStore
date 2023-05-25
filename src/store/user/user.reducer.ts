//create reducer indicating the changes that will take place base on type
import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed } from "./user.action";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading : boolean;
    readonly error : Error | null;
}


const INITIAL_STATE : UserState  = {
    currentUser : null,
    isLoading : false, 
    error : null,

}

//since userReducer is going to be call with every change in action we have to return by default state
//indicating that nothing has change if it isn't the reducer you want to hit
export const userReducer = (
    state = INITIAL_STATE, 
    action  = {} as AnyAction
    ) => {
    //state holds the current user

    if(signInSuccess.match(action)){
        return {
            ...state, //give me all the vallues 
            currentUser : action.payload, // add this new value or overwrite the others values I wnat
            isLoading : false,
        };
    }

    if(signOutSuccess.match(action)){
        return {
            ...state,
            currentUser: null
        };
    }

    if(signOutFailed.match(action) || signUpFailed.match(action) || signInFailed.match(action)){
        return { ...state, error: action.payload, isLoading: false };
    }


    return state;
};
   
    // switch(type){
    //     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:   
    //         return {
    //             ...state, //give me all the vallues 
    //             currentUser : payload, // add this new value or overwrite the others values I wnat
    //             isLoading : false,
    //         };
    //     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
    //         return {
    //             ...state,
    //             currentUser: null
    //         };
    //     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    //     case USER_ACTION_TYPES.SIGN_UP_FAILED:
    //     case USER_ACTION_TYPES.SIGN_IN_FAILED:
    //         return { ...state, error: payload, isLoading: false };
    //     default: 
    //         return state;
    // }


