
import { useState, FC, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import {selectCartTotal} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector'
import { FormContainer } from './payment-form.styles';
import {BUTTON_TYPE_CLASSES} from '../button/button.component'
import { PaymentButton, PaymentFormContainer } from './payment-form.styles';


const PaymentForm =()=>{
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

     // don't want to let default form submission happen here,
    // which would refresh the page.
    const paymentHandler = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        // Stripe.js hasn't yet loaded.
        // disable form submission until Stripe.js has loaded.
        if(!stripe || !elements){
            return;
        }
        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({amount:amount * 100})
        }).then(res =>{
            return res.json()
        }
    );

    const{paymentIntent:{client_secret}} = response;
    console.log(client_secret);

    const cardDetails = elements.getElement(CardElement);
    if(cardDetails === null) return; 
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method:{
        card: cardDetails,
          billing_details:{
            name: currentUser? currentUser.displayName: 'Guest',
        }
      }
 });
 setIsProcessingPayment(false);

 if(paymentResult.error){
  alert(paymentResult.error);
 }else{
  if(paymentResult.paymentIntent.status === 'succeeded'){
    alert('payment');
  }
 }
    
    }
    return(
       <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment:</h2>
         <CardElement/>
         <PaymentButton
          isLoading ={isProcessingPayment} 
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          >  
            Pay now
            </PaymentButton>
        </FormContainer>
       </PaymentFormContainer>   
    )

}

export default PaymentForm;