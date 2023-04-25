import { createContext, useState } from  'react';

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

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}


