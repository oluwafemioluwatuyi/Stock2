import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {PaymentFormContainer, FormContainer} from './payment-form.styles'

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

const PaymentForm =()=>{
    const stripe = useStripe();
    const elements = useElements();

     // don't want to let default form submission happen here,
    // which would refresh the page.
    const paymentHandler = async (e) =>{
        e.preventDefault();

        // Stripe.js hasn't yet loaded.
        // disable form submission until Stripe.js has loaded.
        if(!stripe || !elements){
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({amount:10000})
        }).then(res => res.json());

        console.log(response);

        
    }
    return(
       <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment:</h2>
         <CardElement/>
         <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
        </FormContainer>
       </PaymentFormContainer>   
    )

}

export default PaymentForm;