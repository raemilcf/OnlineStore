//create reducer indicating the changes that will take place base on type
import  USER_ACTION_TYPES  from "./user.types";

const INITIAL_STATE = {
    currentUser : null,
    isLoading : false, 
    error : null,

}

//since userReducer is going to be call with every change in action we have to return by default state
//indicating that nothing has change if it isn't the reducer you want to hit
export const userReducer = (
    state = INITIAL_STATE, 
    action = {}
    ) => {
    //state holds the current user
    const { type, payload } = action;
   
    switch(type){
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:   
            return {
                ...state, //give me all the vallues 
                currentUser : payload, // add this new value or overwrite the others values I wnat
                isLoading : false,
            };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            };
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return { ...state, error: payload, isLoading: false };
        default: 
            return state;
    }
};

