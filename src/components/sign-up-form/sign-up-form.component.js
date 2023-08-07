import { useState} from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebaseutils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '' 
}



const SignUpForm = () => {

   

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormField = () =>{
        setFormFields(defaultFormFields);
    }

    const hangleChange = (event) =>{

        const {name, value} = event.target

        setFormFields({...formFields, [name] : value});

    }

    console.log(formFields);
    

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match');  
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormField();


        } catch(error){
            console.log('user creation encountered an error' , error);

        }

    }

    return(
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}> 
                <FormInput
                label='Name'
                type="text"
                 required 
                 onChange={hangleChange}
                 name="displayName"
                 value={displayName}/>

                <FormInput
                 label="Email"
                 type='email'
                 required 
                 onChange={hangleChange}
                  name="email"
                 value={email}
                 />
                <FormInput
                label='password'
                type="password" 
                required 
                onChange={hangleChange}
                name="password" 
                 value={password}/>

                <FormInput
                label='confirm password'
                type="password"
                 required 
                 onChange={hangleChange} 
                 name="confirmPassword" 
                 value={confirmPassword}/>

                <Button buttonType= 'google' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export  default SignUpForm;