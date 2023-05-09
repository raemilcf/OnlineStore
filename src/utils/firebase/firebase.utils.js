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
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

//firestore
import {
    getFirestore,
    doc, //get instance 
    getDoc, //get documents 
    setDoc, // set documents 
    collection,
    writeBatch,
    query,
    getDocs
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

//add collection and documents to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    //get the collection (table ) to work with 
    const collectionRef = collection(db, collectionKey);
    //initialize batch trans
    const batch = writeBatch(db);


    //unit of work - commit all transactions in one batch 
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done commit ");

}

//get categories map - list of categories 
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    //generate a query from the collection 
    const queryRequest = query(collectionRef);

    //get docs get snapshot of all the collection 
    const querySnapshot = await getDocs(queryRequest);

    //convert to object that follows the structure of Shop-data.js
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    
   
}

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

//sign out the user
export const singOutUser = async () => await signOut(auth);

//observable -allow to keep track of the user state at any moment 
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
//always listening, stop listening when component that is using unmount
//observer pattern
