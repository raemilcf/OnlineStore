import {all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories.saga';
import { userSagas } from './user/user.saga';

//generator function
export function* rootSaga() {

    //execute our request of getting categories from firestore
    yield all([call(categoriesSaga), call(userSagas)]);
}

//similar to async await 

//function generator 
/**
 * first time invoque is suspended 
 * with gen.next() -> console.log is print and function runs 
function* gen(){
    console.log('a'); //console is not logged, since is a generator object
} 

you can assign the value to generation function 
const objG = gen.next();
if console log objG will print out the result 

yield-> resolve async request 
yield -> stash multiple execution, and handle execution 

 */


//MOST USE WHEN YOU NEED TO HANDLE MULTIPLE ASYNC EVENTS  

