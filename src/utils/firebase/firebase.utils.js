// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//authentication -first create in firebase console - authentication - signin methods - add google and user to test login
//separete authtication from firebase database - user auth y user db are different 
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

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