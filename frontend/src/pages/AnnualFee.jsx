import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import MyContext from '../components/MyContext';
import Input from '../components/Input';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import RegisterFirst from './RegisterFirst';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-19-helmet-async'

const AnnualFee = () => {
  const { feeAmount, userInfo, setUserInfo, setFeeAmount, isLoggedIn } =
    useContext(MyContext);
  const navigate = useNavigate();

  const [isMember, setIsMember] = useState(false);
  const { t } = useTranslation();
  //first get the token

  useEffect(() => {
    //load member details
    if (!isLoggedIn) return;
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/members/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.notmember) {
          setIsMember(false);
        } else {
          setIsMember(true);
          setUserInfo(res.data.member);
          if (res.data.member.membershiptype === 'Family') {
            setFeeAmount(120);
          } else if (res.data.member.membershiptype === 'Single') {
            setFeeAmount(80);
          } else {
            setFeeAmount(0);
          }
        }
      })
      .catch((error) => console.log('error fetching user', error));
  }, []);

  const handleFee = async (e) => {
    e.preventDefault();
    const amount = feeAmount;
    // const memberid = userInfo?.memberid;

    const data = { amount };
    //validate the member id
    axios
      .post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/members/create-checkout-session-annualfee`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const secret = res.data.clientSecret;

        // Redirect to central checkout page
        navigate(`/checkout?clientSecret=${encodeURIComponent(secret)}`);
      })
      .catch((error) => console.log(error));
  };
  return isMember ? (
    <>
      <Helmet>
        <title>Membership Fee | faithbridge</title>
        <meta
          name="description"
          content="Support our church through donations. Every contribution helps our community grow and serve."
        />
        <meta
          name="keywords"
          content="church donation, tithe, support church, give online"
        />
        <meta property="og:title" content="Membership Fee | faithbridge" />
        <meta
          property="og:description"
          content="Support our community through your generous donation."
        />
        <meta property="og:url"content={window.location.href} />
      </Helmet>
      <div className=" pb-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white rounded-xl border border-gray-200 shadow-lg p-6 md:p-8">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {t('membershipannualfee')}
          </h1>

          {/* Payment section */}

          <div className="flex flex-col md:flex-row justify-between items-end gap-6 py-4 mb-6 border-b border-gray-100">
            <div className="flex-1">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('amount')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-lg font-semibold"
                  readOnly
                  value={feeAmount}
                  name="amount"
                  id="amount"
                />
                <span className="absolute right-3 top-3.5 text-gray-500 font-medium">
                  CAD
                </span>
              </div>
            </div>

            <button
              className="w-full md:w-auto px-8 py-3 hover:cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
              onClick={handleFee}
            >
              {t('paynow')}
            </button>
          </div>

          {/* User information */}
          <div className="w-full">
            <fieldset className="border border-green-600 rounded-xl p-4 md:p-6">
              <legend className="px-2 text-lg font-bold text-gray-700">
                {t('memberinfo')}
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    {t('firstname')}
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    {userInfo?.firstname || 'N/A'}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    {t('lastname')}
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    {userInfo?.lastname || 'N/A'}
                  </div>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    {t('email')}
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    {userInfo?.email || 'N/A'}
                  </div>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    {t('membershiptype')}
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    {userInfo?.membershiptype || 'N/A'}
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  ) : (
    <RegisterFirst />
  );
};

export default AnnualFee;
