import  USER_ACTION_TYPES  from './user.types'
//declare all the data modification you pretend to do to the object
import { createAction } from '../../utils/reducer/reducer.util';
 //update current user 
 export const setCurrentUser = (user) => {
    //every time dispatched runs if object changes it re-renders the funcitonal component and update all the pages that are listening 
    console.log(user);
    createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user);
}