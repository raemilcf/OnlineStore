//delcare all reducer we are going to use in the project 
import { combineReducers } from 'redux';

import { userReducer }  from './user/user.reducer';
import { categoriesReducer } from './categories/categories.reducer';

//root reducer will combine all our reducers 
export const rootReducer = combineReducers({
    user : userReducer,
    categories : categoriesReducer
});

