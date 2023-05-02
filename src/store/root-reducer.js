import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';

//root reducer will combine all our reducers 
export const rootReducer = combineReducers({

    user : userReducer

});