import React from 'react';
import Input from '../components/Input';
import { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import MyContext from '../components/MyContext';
const urllocal = `http://localhost:5000`;

const Donate = () => {
  const [amount, setAmount] = useState(0);
  const [errorMessage,setErrorMessage] = useState({
    amterr:undefined,
  })
  const {token,setToken } =
    useContext(MyContext);
  //first get the token

  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  },[])
  

  const handleDonate = async (e) => {
    e.preventDefault();
 

    //validate input
    if (!amount) {
      setErrorMessage((prev)=>({
        ...prev,
        amterr:'Please enter amount'}))
  
    }
    if(!amount){
      return;
    }

    axios.post(`${urllocal}/api/members/create-checkout-session-donation`,{amount}, {
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
  <div className="pt-45 flex flex-col items-center">
    <div className="w-11/12 md:w-3/4 px-6 py-8 rounded-lg shadow-xl space-y-4 border bg-stone-50 ">
      {/* <h3 className="text-center  text-2xl">Church Logo</h3> */}
      <h1 className="text-center text-2xl  font-titles">
        Thank You for Supporting the Ministry
      </h1>
      {/* <hr className="border-gray-400" /> */}

      <form className="space-y-6 w-full pt-7">
        {/* Quick amount buttons */}
        <div className="flex justify-around flex-wrap gap-4">
          {[25, 50, 100,200].map((val) => (
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
          <span className="font-text text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Custom amount input */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-3 w-full">
            <label htmlFor="amount" className="text-xl font-text ">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              min={0}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className=" px-3 py-1  font-text text-xl rounded outline-none border border-gray-400"
            />
            <span className="text-2xl font-text text-white">CAD</span>
          </div>
          {errorMessage.amterr && (
            <p className="text-center text-red-500">Please enter amount.</p>
          )}
        </div>

        {/* Submit button */}
        <button
          className="w-1/2 border m-auto block bg-white text-dark text-xl px-6 py-2 rounded-lg font-buttons hover:bg-dark hover:text-white hover:cursor-pointer"
          onClick={handleDonate}
        >
          Donate Now
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
