import {ChangeEvent, FormEvent, useState} from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, Title, ButtonContainer  } from  './sign-in-form.styles';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';
import { AuthError } from 'firebase/auth';

//create default object with values to handle in the form 
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    //generized changes 
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name , value} = event.target;
        //annotation to save values of the form 
        setFormFields({...formFields, [name] : value});
    };

    //reset formFields to default - clean form
    const resetFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    //create user in authentication firebase and in firestore db
    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{

            dispatch(emailSignInStart( email, password ));
            //reset form field 
            resetFields();
        }catch(error){
           // console.log('user sign in failed', error);
            if((error as AuthError).code === 'auth/wrong-password' || (error as AuthError).code === "auth/user-not-found"){
                alert("Email or password invalid!");
            }
        }
    };

    return (
        <SignInContainer>
        <Title>Already hava an account?</Title>
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
          
            <ButtonContainer>
                <Button  type="submit">Sign in</Button>
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >Google Sign in</Button>
            </ButtonContainer>
            
        </form>

        </SignInContainer>
    );
}

export default SignInForm;