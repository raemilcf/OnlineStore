//declare all the data you need to access to simplify the use and declaration in the componenet

import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

//selector is where you do your bussinesss logic 
export const selectUserReducer = (state) : UserState => state.user;


export const selectCurrentUser = createSelector(

    selectUserReducer,
    (user) => user.currentUser

)