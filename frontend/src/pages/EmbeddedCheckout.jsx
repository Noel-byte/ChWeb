import { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const EmbeddedCheckout = ({ clientSecret }) => {
  const checkoutRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const mount = async () => {
      const stripe = await stripePromise;
      if (!stripe || !clientSecret || !mounted) return;

      // If there's already a mounted checkout, unmount it first
      if (checkoutRef.current) {
        checkoutRef.current.unmount();
      }

      const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
      checkout.mount('#checkout');

      checkoutRef.current = checkout;
    };

    mount();

    // Cleanup function to unmount checkout when component unmounts or clientSecret changes
    return () => {
      mounted = false;
      if (checkoutRef.current) {
        checkoutRef.current.unmount();
        checkoutRef.current = null;
      }
    };
  }, [clientSecret]);

  return <div id="checkout" style={{ minHeight: '600px' }} />;
};

export default EmbeddedCheckout;

