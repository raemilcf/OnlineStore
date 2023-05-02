
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER' 
}

const INITIAL_STATE = {
    currentUser : null
}

//since userReducer is going to be call with every change in action we have to return by default state
//indicating that nothing has change if it isn't the reducer you want to hit
export const userReducer = (state = INITIAL_STATE, action) => {
    //state holds the current user
    const { type, payload } = action;
   
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:   
            return {
                ...state, //give me all the vallues 
                currentUser : payload // add this new value or overwrite the others values I wnat
            }
        default: 
            return state;
    }
}
