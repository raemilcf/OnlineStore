import {useContext, useState} from 'react';

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss'
import { UserContext } from '../../context/user.context';


//create default object with values to handle in the form 
const defaultFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {

    console.log("hit sign up");

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    //multiple component listeneing to a context, even if you dont doing anything with that hook, it will re-render your page 
    //all the code is call during the re render process of the context change
    const { setCurrentUser } = useContext(UserContext);

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


    //create user in authentication firebase and in firestore db
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('Pasword dont match');
            return;

        }

        try{

            //create user in authentication- users
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            //update values of the user in the context, this will re-render all parts that are using this context
            setCurrentUser(user);

            //create user in firestore
            await createUserDocumentFromAuth(user, {displayName});

            //reset form field 
            resetFields();

        }catch(error){

            //if email already exists return error
            if(error.code === 'auth/email-already-in-use'){
                alert("Email exist");
            }else {

                console.log("User creation error", error);
            }
        }
    };

    return (
        <div className='sign-up-container'>
        <h2>Don't hava an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput 
                label="Display Name"
                type='text' 
                required 
                onChange={handleChange} 
                name="displayName" 
                value={displayName}
            />
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
            <FormInput 
                label="Confirm Password"
                type='password' 
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}
            />

            <Button  type="submit">Create Account</Button>

        </form>

        </div>
    );
}

export default SignUpForm;