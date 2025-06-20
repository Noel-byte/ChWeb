import React from 'react';
import MyContext from '../components/MyContext';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

const RegisterFirst = () => {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const closeDialog = () => {
    setIsDialogOpen(false);
    navigate('/');
  };
  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div
            ref={dialogRef}
            className="relative bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-yellow-200 rounded-xl shadow-2xl w-full max-w-md p-6 "
          >
            {/* Checkmark icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-500 rounded-full p-2 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86l-8.1 14A1 1 0 003.1 20h17.8a1 1 0 00.9-1.5l-8.1-14a1 1 0 00-1.72 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Message */}
            <h1 className="text-center font-titles text-2xl text-yellow-900 mb-4">
              Register First
            </h1>
            <p>
              You  are not a member yet , Contact the administrator for registration. <strong>You can donate without membership.</strong>
            </p>

            {/* Close button */}
            <div className="flex justify-center">
              <button
                onClick={closeDialog}
                className="bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-colors duration-300"
              >
                Close
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterFirst;
