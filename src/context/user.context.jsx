import { createContext, useState, useEffect } from  'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

//actual value you want to access 
export const UserContext = createContext({
    //base empty state
    currentUser : null,
    setCurrentUser: () => null,
});

//actual return and use of users 
//user provider allow children to access and modify current user
export const UserProvider = ({ children }) => {
    //use our state modifier for user 
    const [currentUser, setCurrentUser] = useState(null);
    //actual value we will be using for user
    const value = { currentUser, setCurrentUser};

    //run when the component mount
    //allow to keep track of the auth state change listener 
    useEffect( () => {
        const unsubscribe = onAuthStateChangedListener((user) => {

            //if logged in with google sso account create user from document 
            if(user){
                createUserDocumentFromAuth(user);
            }

            //update hook with user 
            setCurrentUser(user);
         })
         return unsubscribe;
    } ,[] );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}


