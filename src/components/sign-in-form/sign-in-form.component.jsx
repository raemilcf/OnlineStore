import {useState, useContext} from 'react';

import {
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword

} from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../context/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

//create default object with values to handle in the form 
const defaultFormFields = {
    email: '',
    password: ''
}



const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    console.log("hit sign in");


    //generized changes 
    const handleChange = (event) => {
        const {name , value} = event.target;

        //annotation to save values of the form 
        setFormFields({...formFields, [name] : value});
    };

    //reset formFields to default - clean form
    const resetFields = () => {
        setFormFields(defaultFormFields);
    }


    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    //create user in authentication firebase and in firestore db
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{

            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);

            //reset form field 
            resetFields();


        }catch(error){
            if(error.code === 'auth/wrong-password' || error.code === "auth/user-not-found"){
                alert("Email or password invalid!");

            }
            
        }
    };

    return (
        <div className='sign-up-container'>
        <h2>Already hava an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput 
                label="Email"
                type='email' 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}
            />
            <FormInput 
                label="Password"
                type='password' 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}
            />
          
            <div className='buttons-container'>
                <Button  type="submit">Sign in</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle} >Google Sign in</Button>
            </div>
            
        </form>

        </div>
    );
}

export default SignInForm;