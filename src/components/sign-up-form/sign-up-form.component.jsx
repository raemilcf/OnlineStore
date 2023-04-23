import {useState} from 'react';

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

//create default object with values to handle in the form 
const defaultFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

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
            console.log(user);

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
        <div>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={handleSubmit}>
            <label>Display Name</label>
            <input  type='text' required onChange={handleChange} name="displayName" value={displayName}/>

            <label>Email</label>
            <input  type='email' required onChange={handleChange} name="email" value={email} />

            <label>Password</label>
            <input  type='password' required onChange={handleChange} name="password" value={password}/>

            <label>Confirm Password </label>
            <input  type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <button type="submit">Create Account</button>

        </form>

        </div>
    );
}

export default SignUpForm;