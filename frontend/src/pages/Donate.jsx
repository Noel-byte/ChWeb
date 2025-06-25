import React from 'react';
import Input from '../components/Input';
import { useState,useContext, useEffect } from 'react';
import axios from 'axios';
import MyContext from '../components/MyContext';
import { useTranslation } from 'react-i18next';



const Donate = () => {
  const [amount, setAmount] = useState(1);
  const {
    setIsAdmin,
    setIsLoggedIn,
    setUserInfo,

  } = useContext(MyContext);
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState({
    amterr: undefined,
  });

    useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/members/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsAdmin(res.data.isAdmin);
        setUserInfo(res.data.member);
        setIsLoggedIn(true)
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [setUserInfo,setIsLoggedIn,setIsAdmin]);
  //first get the token

  const handleDonate = async (e) => {
    e.preventDefault();

    //validate input
    if (!amount) {
      setErrorMessage((prev) => ({
        ...prev,
        amterr: 'Please enter amount',
      }));
    }
    if (!amount) {
      return;
    }

    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/members/create-checkout-session-donation`,
        { amount },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        //redirect to Stripe checkout
        console.log('Stripe session URL: ',res.data.url)
        window.location.href = res.data.url;
      })
      .catch((error) => {console.log(error);

        if(error.response){
          console.error('Error response:',error.response.data)
        }
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-11/12 md:w-3/4 px-6 py-8 rounded-lg shadow-xl space-y-4 border bg-stone-50 ">
        {/* <h3 className="text-center  text-2xl">Church Logo</h3> */}
        <h1 className="text-center text-2xl  font-titles">
          {t('donationheader')}
        </h1>
        {/* <hr className="border-gray-400" /> */}

        <form className="space-y-6 w-full pt-7">
          {/* Quick amount buttons */}
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

          {/* OR separator */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="font-text text-gray-400">{t('or')}</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Custom amount input */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap justify-center items-center gap-3 w-full">
              <label htmlFor="amount" className="text-xl font-text ">
                {t('amount')}
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  min={1}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setAmount('');

                      return;
                    }
                    //check is a valid number and non-negative
                    const num = Number(val);

                    if (Number.isNaN(num) || num <= 0) {
                      // invalid input
                      setErrorMessage((prev) => ({
                        ...prev,
                        amterr: 'please enter a valid value',
                      }));
                      return;
                    }
                    // valid number
                    setErrorMessage((prev) => ({
                      ...prev,
                      amterr: '',
                    }));

                    setAmount(e.target.value);
                  }}
                  value={amount}
                  className=" w-full py-3 px-4 border border-gray-300 rounded-lg text-lg font-semibold"
                />
                <span className="absolute right-3 top-3.5 text-gray-500 font-medium">
                  CAD
                </span>
              </div>
            </div>
            {errorMessage.amterr && (
              <p className="text-center text-red-500">{errorMessage.amterr}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            className="w-1/2 border m-auto block bg-white text-dark text-xl px-6 py-2 rounded-lg font-buttons hover:bg-dark hover:text-white hover:cursor-pointer"
            onClick={handleDonate}
          >
            {t('paynow')}
          </button>

          <h4 className="text-center font-titles text-white">
            "Secure donation powered by Stripe"
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Donate;
