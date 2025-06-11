import React from 'react';
import { useContext, useEffect } from 'react';
import MyContext from '../components/MyContext';
import Input from '../components/Input';
import axios from 'axios';
const urllocal = `http://localhost:5000`;
const AnnualFee = () => {
  const { feeAmount, userInfo, setUserInfo, setFeeAmount,token } =
    useContext(MyContext);
  //first get the token


  
  useEffect(() => {
    //load member details
    if(!token) return;
    axios
      .get(`${urllocal}/api/members/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {

        setUserInfo(res.data.member);
        if (res.data.member.membershiptype === 'Family') {
          setFeeAmount(120);
        }
        if (res.data.member.membershiptype === 'Single') {
          setFeeAmount(80);
        }
      })
      .catch((error) => console.log('error fetching user', error));
  },[token]);

  const handleFee = async (e) => {
    e.preventDefault();
    const amount = feeAmount;
    // const memberid = userInfo?.memberid;

    const data ={amount}
    //validate the member id
    axios.post(`${urllocal}/api/members/create-checkout-session-annualfee`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=>{
      //redirect to Stripe checkout
      window.location.href = res.data.url
      } )
    .catch((error)=>console.log(error));
  };
 return (
  <div className="pt-45 flex flex-col items-center  text-black"> {/* Add padding to push below header */}
    <div className="space-y-2  w-3/4 py-6 px-4 rounded-lg   border shadow-md bg-stone-50">
      <h1 className="text-center text-2xl font-titles ">
        Annual Membership Payment
      </h1>

      <form className="flex gap-2 justify-center py-6 w-full md:w-3/4 m-auto  font-text">
        <div>
          <label htmlFor="amount" className="font-bold">
            Amount
          </label>
          <input
            type="number"
            className="outline-0 border px-3 py-1 ml-2 rounded"
            readOnly
            value={feeAmount}
            name="amount"
            id="amount"
          />
          <span className="font-titles ml-2 font-semibold">CAD</span>
        </div>

        <button
          className="px-8 py-1 rounded-lg uppercase font-buttons bg-white text-dark border  hover:bg-dark hover:text-white hover:cursor-pointer"
          onClick={handleFee}
        >
          Pay Now
        </button>
      </form>

      <div className="w-full md:w-1/2 m-auto text-center py-4 font-text ">
        <fieldset className="border border-green-700 p-4 rounded-md">
          <legend className=" font-semibold">
            User Information
          </legend>

          <div className="flex gap-4 justify-center  pt-2 items-center">
            <div className="flex flex-col  gap-3 font-bold text-left">
              <label htmlFor="firstname" className="outline-0 px-3 py-1 ">First Name:</label>
              <label htmlFor="lastname" className="outline-0 px-3 py-1 ">Last Name:</label>
              <label htmlFor="email" className="outline-0 px-3 py-1 ">Email:</label>
              <label htmlFor="membershiptype" className="outline-0 px-3 py-1 ">Membership Type:</label>
            </div>

            <div className="flex flex-col gap-3 text-left">
              <input
                type="text"
                readOnly
                value={userInfo?.firstname}
                className="outline-0 px-3 py-1 border rounded"
              />
              <input
                type="text"
                readOnly
                value={userInfo?.lastname}
                className="outline-0 px-3 py-1 border rounded"
              />
              <input
                type="text"
                readOnly
                value={userInfo?.email}
                className="outline-0 px-3 py-1 border rounded"
              />
              <input
                type="text"
                readOnly
                value={userInfo?.membershiptype}
                className="outline-0 px-3 py-1 border rounded"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
);

};

export default AnnualFee;
