// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//authentication -first create in firebase console - authentication - signin methods - add google and user to test login
//separete authtication from firestore database - user auth y user db are different 
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithRedirect ,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters ({
    prompt : "select_account"
});

//same auth for the hole app, dont need more than one auth 
//can generate multiple provider facebook, slack, linkedin etc
export const auth = getAuth(); //keep tracks of the authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


//firestore instance 
export const db = getFirestore();

//validate if user exist and if not create in DB or return existing user
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    if(!userAuth) return;

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
                createdAt,
                ...additionalInformation //will add or replace some values like display name if exist in additonalinformation
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


//create user with email and password comes native from firebase auth
export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    //protect front-end from future changes, only need to change here, not in sign up form
    const user = await createUserWithEmailAndPassword(auth, email, password);

    return user;
}

//login user
export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    //protect front-end from future changes, only need to change here, not in sign up form
    return await signInWithEmailAndPassword(auth, email, password);

}