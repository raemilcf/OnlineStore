import {useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth';

import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

//safe guards 


const SignIn = () => {

    // useEffect(() => {

    //     const loginRedirect = async () => {
    //         const response = await getRedirectResult(auth);
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //             console.log(userDocRef);
    //         }
    //     };

    //     loginRedirect();
    // }, []);

    const logGoogleUserPopup = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    return (

        <div>
            <h1>sign in Page</h1>
            <button onClick={logGoogleUserPopup}> Sign in with Google popup</button>
            {/* <br />
            <button onClick={signInWithGoogleRedirect}> Sign in with Google redirect</button> */}
            <SignUpForm />

        </div>
    );


}

export default SignIn;