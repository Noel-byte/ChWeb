// src/pages/Checkout.jsx
import React, { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const checkoutRef = useRef(null);
  const query = new URLSearchParams(window.location.search);
  const clientSecret = query.get('clientSecret');

  useEffect(() => {
    let mounted = true;

    const mount = async () => {
      const stripe = await stripePromise;

      if (!stripe || !clientSecret || !mounted) return;

      if (checkoutRef.current) {
        checkoutRef.current.unmount();
      }

      const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
      checkout.mount('#checkout');
      checkoutRef.current = checkout;
    };

    mount();

    return () => {
      mounted = false;
      if (checkoutRef.current) {
        checkoutRef.current.unmount();
        checkoutRef.current = null;
      }
    };
  }, [clientSecret]);

  return (
    <>
    <h1 className='text-center text-2xl font-titles text-white'>Thank You For The Payment</h1>
    <div
  id="checkout"
  className="min-h-[600px] w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto px-4 py-3 "
/>
    </>
 
);
};

export default Checkout;
