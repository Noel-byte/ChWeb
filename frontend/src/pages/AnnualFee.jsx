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
  <div className=" pb-10 px-4 flex flex-col items-center">
  <div className="w-full max-w-3xl bg-white rounded-xl border border-gray-200 shadow-lg p-6 md:p-8">
    <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
      ዓመታዊ ናይ ኣባልነት ክፍሊት
    </h1>

    {/* Payment section */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-4 mb-6 border-b border-gray-100">
      <div className="flex-1">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          መጠን
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
          <span className="absolute right-3 top-3.5 text-gray-500 font-medium">CAD</span>
        </div>
      </div>
      
      <button
        className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
        onClick={handleFee}
      >
        ሕጂ ኽፈሉ
      </button>
    </div>

    {/* User information */}
    <div className="w-full">
      <fieldset className="border border-green-600 rounded-xl p-4 md:p-6">
        <legend className="px-2 text-lg font-bold text-gray-700">
          ናይ ኣባል ሓበሬታ
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">ሽም</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              {userInfo?.firstname || 'N/A'}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">ሽም ኣባሓጎ</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              {userInfo?.lastname || 'N/A'}
            </div>
          </div>
          
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">ኢ-መይል</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              {userInfo?.email || 'N/A'}
            </div>
          </div>
          
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">ዓይነት ኣባልነት</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              {userInfo?.membershiptype || 'N/A'}
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</div>
  // <div className="pt-45 flex flex-col items-center  text-black"> {/* Add padding to push below header */}
  //   <div className="space-y-2  w-3/4 py-6 px-4 rounded-lg   border shadow-md bg-stone-50">
  //     <h1 className="text-center text-2xl font-titles ">
  //       Annual Membership Payment
  //     </h1>

  //     <form className="flex gap-2 justify-center py-6 w-full md:w-3/4 m-auto  font-text">
  //       <div>
  //         <label htmlFor="amount" className="font-bold">
  //           Amount
  //         </label>
  //         <input
  //           type="number"
  //           className="outline-0 border px-3 py-1 ml-2 rounded"
  //           readOnly
  //           value={feeAmount}
  //           name="amount"
  //           id="amount"
  //         />
  //         <span className="font-titles ml-2 font-semibold">CAD</span>
  //       </div>

  //       <button
  //         className="px-8 py-1 rounded-lg uppercase font-buttons bg-white text-dark border  hover:bg-dark hover:text-white hover:cursor-pointer"
  //         onClick={handleFee}
  //       >
  //         Pay Now
  //       </button>
  //     </form>

  //     <div className="w-full md:w-1/2 m-auto text-center py-4 font-text ">
  //       <fieldset className="border border-green-700 p-4 rounded-md">
  //         <legend className=" font-semibold">
  //           User Information
  //         </legend>

  //         <div className="flex gap-4 justify-center  pt-2 items-center">
  //           <div className="flex flex-col  gap-3 font-bold text-left">
  //             <label htmlFor="firstname" className="outline-0 px-3 py-1 ">First Name:</label>
  //             <label htmlFor="lastname" className="outline-0 px-3 py-1 ">Last Name:</label>
  //             <label htmlFor="email" className="outline-0 px-3 py-1 ">Email:</label>
  //             <label htmlFor="membershiptype" className="outline-0 px-3 py-1 ">Membership Type:</label>
  //           </div>

  //           <div className="flex flex-col gap-3 text-left">
  //             <input
  //               type="text"
  //               readOnly
  //               value={userInfo?.firstname}
  //               className="outline-0 px-3 py-1 border rounded"
  //             />
  //             <input
  //               type="text"
  //               readOnly
  //               value={userInfo?.lastname}
  //               className="outline-0 px-3 py-1 border rounded"
  //             />
  //             <input
  //               type="text"
  //               readOnly
  //               value={userInfo?.email}
  //               className="outline-0 px-3 py-1 border rounded"
  //             />
  //             <input
  //               type="text"
  //               readOnly
  //               value={userInfo?.membershiptype}
  //               className="outline-0 px-3 py-1 border rounded"
  //             />
  //           </div>
  //         </div>
  //       </fieldset>
  //     </div>
  //   </div>
  // </div>
);

};

export default AnnualFee;
