import MyContext from '../components/MyContext';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(true)

  // useEffect(() => {
  //   if (dialogRef.current) {
  //     dialogRef.current.showModal();
  //   }
  // });

  const closeDialog = () => {
    setIsOpen(false)
    navigate('/');
  };

  return (
    <>
  {isOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
    <div
      ref={dialogRef}
      className="relative bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-emerald-200 rounded-xl shadow-2xl w-full max-w-md p-6 "
    >
      {/* Checkmark icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-green-500 rounded-full p-2 flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
      </div>

      {/* Message */}
      <h1 className="text-center font-titles text-2xl text-emerald-900 mb-4">
        ስለቲ ዝገበርኩምዎ ልግሲ የቐንየልና!
      </h1>
      <p className="text-center text-gray-600 mb-6">
        ናትኩም ደገፍ ትልአኾና ክንቅጽልን ንሕብረተሰብ ከነገልግልን ይሕግዘና ።
      </p>

      {/* Close button */}
      <div className="flex justify-center">
        <button
          onClick={closeDialog}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-colors duration-300"
        >
          ዕጸው
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500"></div>
    </div>
  </div>
)}

    </>

    //destsroy the token
  );
};

export default Success;
