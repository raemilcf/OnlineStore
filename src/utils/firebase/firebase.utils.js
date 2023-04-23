// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//authentication -first create in firebase console - authentication - signin methods - add google and user to test login
//separete authtication from firestore database - user auth y user db are different 
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithRedirect 
} from "firebase/auth";

//firestore
import {
    getFirestore,
    doc, //get instance 
    getDoc, //get documents 
    setDoc // set documents 
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//allow you to make crud
const firebaseConfig = {
  apiKey: "AIzaSyD0LcwWtIaO050apyXVUduXa8YN3MCAfZg",
  authDomain: "online-shopping-react-ed10a.firebaseapp.com",
  projectId: "online-shopping-react-ed10a",
  storageBucket: "online-shopping-react-ed10a.appspot.com",
  messagingSenderId: "1070667713578",
  appId: "1:1070667713578:web:74784a174a51a33e2c4753"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//google auth 
const provider = new GoogleAuthProvider();

provider.setCustomParameters ({


    prompt : "select_account"
});

//same auth for the hole app, dont need more than one auth 
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


//firestore instance 
export const db = getFirestore();

//validate if user exist and if not create in DB or return existing user
export const createUserDocumentFromAuth = async (userAuth) => {
    //see if there is a document reference (actual instance)
    const userDocRef = doc(db, 'users', userAuth.uid);

    //get collection of DB
    const userSnapshot = await getDoc(userDocRef);

    //validate if user exist in database
    //if user data no exist 
    if(!userSnapshot.exists()){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        //then create user in collection
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log("Error creating user", error.message);

        }
    }

    //if user data exist 
    //return user doc ref
    return userDocRef;

}