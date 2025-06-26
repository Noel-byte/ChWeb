import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import MyContext from '../components/MyContext';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Donate = () => {
  const [amount, setAmount] = useState(1);
  const { setIsAdmin, setIsLoggedIn, setUserInfo } = useContext(MyContext);
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState({ amterr: undefined });
  const checkoutRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/members/user`, { withCredentials: true })
      .then((res) => {
        setIsAdmin(res.data.isAdmin);
        setUserInfo(res.data.member);
        setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setErrorMessage({ amterr: 'Please enter a valid amount' });
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/members/create-checkout-session-donation`,
        { amount },
        { withCredentials: true }
      );

      const { clientSecret } = res.data;

      const stripe = await stripePromise;
      const elements = stripe.elements({ clientSecret });
      const checkout = elements.create('checkout');
      checkout.mount(checkoutRef.current);
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.error('Stripe error:', err.response.data);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-11/12 md:w-3/4 px-6 py-8 rounded-lg shadow-xl space-y-4 border bg-stone-50">
        <h1 className="text-center text-2xl font-titles">{t('donationheader')}</h1>

        <form className="space-y-6 w-full pt-7">
          <div className="flex justify-around flex-wrap gap-4">
            {[25, 50, 100, 200].map((val) => (
              <span
                key={val}
                className="bg-white border px-12 py-1 text-green-400 font-text text-xl font-bold rounded hover:cursor-pointer hover:bg-green-700 hover:text-white"
                onClick={() => setAmount(val)}
              >
                ${val}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="font-text text-gray-400">{t('or')}</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <label htmlFor="amount" className="text-xl font-text ">
              {t('amount')}
            </label>
            <div className="relative">
              <input
                type="number"
                name="amount"
                id="amount"
                min={1}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-lg font-semibold"
              />
              <span className="absolute right-3 top-3.5 text-gray-500 font-medium">CAD</span>
            </div>
            {errorMessage.amterr && (
              <p className="text-center text-red-500">{errorMessage.amterr}</p>
            )}
          </div>

          <button
            className="w-1/2 border m-auto block bg-white text-dark text-xl px-6 py-2 rounded-lg font-buttons hover:bg-dark hover:text-white hover:cursor-pointer"
            onClick={handleDonate}
          >
            {t('paynow')}
          </button>

          <div ref={checkoutRef} className="mt-8" />

          <h4 className="text-center font-titles text-gray-500">
            "Secure donation powered by Stripe"
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Donate;
