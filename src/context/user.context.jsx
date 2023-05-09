// import { createContext,  useEffect, useReducer  } from  'react';
// import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// import { createAction } from '../utils/reducer/reducer.util';

// //actual value you want to access 
// export const UserContext = createContext({
//     //base empty state
//     currentUser : null,
//     setCurrentUser: () => null,
// });


// export const USER_ACTION_TYPES = {
//     SET_CURRENT_USER : 'SET_CURRENT_USER' 
// }

// const userReducer = (state, action) => {
//     //state holds the current user
//     const { type, payload } = action;
   
//     switch(type){
//         case USER_ACTION_TYPES.SET_CURRENT_USER:   
//             return {
//                 ...state, //give me all the vallues 
//                 currentUser : payload // add this new value or overwrite the others values I wnat
//             }
//         default:
//             throw new Error(`Unhandled type ${type} in userReducer`);
//     }
// }

// const INITIAL_STATE = {
//     currentUser : null
// }

// //actual return and use of users 
// //user provider allow children to access and modify current user
// export const UserProvider = ({ children }) => {
//     //USE OF REDUCERS TO UPDATE STATE
//     const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE);

//     //update current user 
//     const setCurrentUser = (user) => {
//         //every time dispatched runs if object changes it re-renders the funcitonal component and update all the pages that are listening 
//         dispatch(createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user));
//     }

//     //actual value we will be using for user
//     const value = { currentUser, setCurrentUser};

//     //run when the component mount
//     //allow to keep track of the auth state change listener 
//     useEffect( () => {
//         const unsubscribe = onAuthStateChangedListener((user) => {

//             //if logged in with google sso account create user from document 
//             if(user){
//                 createUserDocumentFromAuth(user);
//             }

//             //update hook with user 
//             setCurrentUser(user);
//          })
//          return unsubscribe;
//     } ,[] );

//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>

// }


// //redurcer scale well with complex context 

// //context vs reducers 
// //difference in accesibility 
// //wrap categories provider in shop components becasuse is only used in shop
// //try to put it in cart drop down 
// //we can isolate the context and provider 

// //redux store is global 
// //always has access to all the components 
// //data flow 
// //1. contex A -> component and then acction

// //with redux 
// //3 component 3 reducers 
// //singular store , singular dispatch --> root reducer 


// //dont use context and redux at same time or combine 
// //all state should be save in one place 