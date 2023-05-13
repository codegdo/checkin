import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MzKdfH96P4IQUl5zwXTBULwBreMcDy1HXKVRb5wmGiZtLfdNXE0ntN2nlpmUxq65aoht9Ug0sKircMaieWapTW000W3dlQoeP');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (elements == null || stripe == null) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (cardElement == null) {
      return;
    }
  
    const paymentMethodResult = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (paymentMethodResult.error) {
      console.log(paymentMethodResult.error.message);
      return;
    }
  
    const { paymentMethod } = paymentMethodResult;
  
    // Here we define `clientSecret` and obtain it from our server
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: 1000, // The payment amount in cents
        currency: 'usd',
        description: 'Test payment'
      })
    });
  
    const { clientSecret } = await response.json();
  
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
        receipt_email: 'giang@cmr.bz',
      }
    );
  
    console.log(paymentIntent);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
}

export default function SubscriptionList() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
