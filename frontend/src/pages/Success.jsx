import MyContext from '../components/MyContext';
import { useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const dialogRef = useRef(null);
  const navigate = useNavigate()

  useEffect(()=>{
    if(dialogRef.current){
      dialogRef.current.showModal()
    }
  })

  const closeDialog = ()=>{
       if(dialogRef.current){
        dialogRef.current.close()
       }
       navigate('/')
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
    <dialog ref={dialogRef} className='fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 p-6 shadow-lg rounded backdrop-blur-sm'>
      <form method="dialog" className='flex flex-col items-center gap-2'>
        <h1 className="text-center font-titles  text-3xl">
          Thank You for the Donation!
        </h1>
        <button onClick={closeDialog} className='hover:cursor-pointer outline rounded font-buttons py-1 w-25 text-2xl'>Close</button>
      </form>
    </dialog>
    </>
   

    //destsroy the token
  );
};

export default Success;
