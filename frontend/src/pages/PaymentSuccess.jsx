import React from 'react';
import MyContext from '../components/MyContext';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    navigate('/')
  };
  return (
    <>
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'></div>
      <dialog ref={dialogRef} className='fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg'>
      <form method="dialog" className=' flex flex-col gap-2 items-center'>
        <h1 className="text-center font-titles text-3xl py-1">
          Thank You for the Payment!
        </h1>
        <button onClick={closeDialog} className='hover:cursor-pointer outline w-25 px-3 py-1 rounded font-buttons text-2xl'>Close</button>
      </form>
    </dialog>
    </>
  
  );
};

export default PaymentSuccess;
