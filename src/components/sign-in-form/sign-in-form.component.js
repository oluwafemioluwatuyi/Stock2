import { useState} from "react";
import { useDispatch } from "react-redux";

// import { signInWithGooglePopup,
//          signInAuthUserWithEmailAndPassword,

//          createUserDocumentFromAuth } 
//          from "../../utils/firebase/firebaseutils";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";



const defaultFormFields = {
    email: '',
    password: '',
}



const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password} = formFields;


    console.log(formFields);

    const resetFormField = () =>{
        setFormFields(defaultFormFields);
    }

     const signInWithGoogle = async() => {
        dispatch(googleSignInStart());
     
      
    }

    const hangleChange = (event) =>{

        const {name, value} = event.target

        setFormFields({...formFields, [name] : value});

    }

    console.log(formFields);
    
    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            dispatch(emailSignInStart(email, password));
           // console.log(user)
            resetFormField();
           
        } catch(error){

            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user aassociated with the email');
                    break;
                default:
                    console.log(error)
            }
        }
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}> 
        
                <FormInput
                 label="Email"
                 type='email'
                 required 
                 onChange={hangleChange}
                  name="email"
                 value={email}
                 />
                <FormInput
                label='Password'
                type="password" 
                required 
                onChange={hangleChange}
                name="password" 
                 value={password}/>

                 <div className="buttons-container">
                 <Button  type="submit">Sign In</Button>
                 <Button type='button' buttonType= 'google' onClick={signInWithGoogle}>Google sign in</Button>

                 </div>

               
            </form>
        </div>
    )
}

export  default SignInForm;