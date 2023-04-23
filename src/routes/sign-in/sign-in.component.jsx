import { signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'



//safe guards 


const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    return (

        <div>
            <h1>sign in Page</h1>
            <button onClick={logGoogleUser}> Sign in with Google popup</button>
        </div>
    );


}

export default SignIn;