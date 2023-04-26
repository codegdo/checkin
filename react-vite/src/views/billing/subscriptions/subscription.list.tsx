import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

//const stripePromise = loadStripe('pk_test_51MzKdfH96P4IQUl5zwXTBULwBreMcDy1HXKVRb5wmGiZtLfdNXE0ntN2nlpmUxq65aoht9Ug0sKircMaieWapTW000W3dlQoeP');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    //stripe?.confirmCardPayment();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  );
};

function SubscriptionList() {

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};



export default SubscriptionList;
