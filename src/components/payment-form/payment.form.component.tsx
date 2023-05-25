import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import  { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from './payment.form.styles';

//return only card of stripecard element if is not null (function expression)
const ifValidCardElement = (card : StripeCardElement | null) : card is StripeCardElement => card !== null;


const PaymentForm = () => {
    //hooks
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  

    const paymentHandler = async (e : FormEvent<HTMLFormElement>) => {
        //prevent normal behavior of the page
        e.preventDefault(); 

        //if no instance procced 
        if(!stripe || !elements){
            return;
        }
        setIsProcessingPayment(true);

        //fetch request before our payment intent  to prepere card to be accept charges 

        //get payment data, create a fetch call asking for a pre payment intent 
        //request info we are going to put our route from create-payment-intent which is the same as the route of the file
        const response = await fetch('/.netlify/functions/create-payment-intent', {

            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());


        //get the client secret, so when the user intent to actually pay the order stripe accept it 
        console.log(response);

        const clientSecret = response.paymentIntent.client_secret;

        const cardDetails = elements.getElement(CardElement);

        if(!ifValidCardElement(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: cardDetails,
                billing_details: {
                    name: currentUser ?  currentUser.displayName : "Guest",
                }
            }
        });
        setIsProcessingPayment(false);

        //stripe payment test details 4242....
        if(paymentResult.error){
            alert(paymentResult.error);
        }else {
            console.log(paymentResult.paymentIntent.status);
            if( paymentResult.paymentIntent.status ){
                alert('payment successful');
            }
        }

    }


    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton
                 isLoading= {isProcessingPayment} 
                 buttonType={BUTTON_TYPE_CLASSES.inverted}
                 >
                 Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;