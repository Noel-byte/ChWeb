import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import MyContext from './MyContext';
import { useEffect, useContext, useRef } from 'react';
import axios from 'axios';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const navigate = useNavigate();
  const { setUserInfo, setIsAdmin,isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  const dialogRef = useRef(null);

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/api/members/user`, {
  //       withCredentials: true, //send cookies automatically
  //     })
  //     .then((res) => {
  //       const { member } = res.data;
  //       setUserInfo(member);
  //       setIsAdmin(res.data.isAdmin);
  //       setIsLoggedIn(true);
  //     })
  //     .catch(() => {
  //       setIsLoggedIn(false);
  //     });
  // }, []);

  useEffect(() => {
    if (!isLoggedIn && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (isLoggedIn && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    // redirect after login
    const destination = localStorage.getItem('redirectTo');
    // console.log(destination);
    localStorage.removeItem('redirectTo');

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/google-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      }
    );
    const data = await res.json();
    console.log(data.message); // "Login successful"

    //after login, fetch user info again to update context & state
    try {
      const userRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/members/user`,
        {
          withCredentials: true,
        }
      );
      setUserInfo(userRes.data.member);
      setIsAdmin(userRes.data.isAdmin);
      setIsLoggedIn(true);
    } catch (err) {
      console.log('Failed to fetch user after login', err);
    }

    if (destination === 'annualfee') {
      navigate('/annualfee');
    } else if (destination === 'donate') {
      navigate('/donate');
    } else {
      navigate('/');
    }
  };

  const handleLoginError = () => {
    console.error('Login Failed');
  };

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    navigate('/');
  };
  return (
   (
      <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <dialog
            ref={dialogRef}
            className="bg-dark rounded-xl shadow-lg z-50 w-full max-w-md max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          >
            <div className="p-6">
              <h2 className="text-center text-xl md:text-2xl font-semibold mb-4 text-white ">
                Login with your Google account
              </h2>

              <div className="flex flex-col items-center">
                <GoogleOAuthProvider clientId={clientId}>
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                    size="large"
                    width="300"
                    className="w-full"
                  />
                </GoogleOAuthProvider>

                <button
                  className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 w-full max-w-xs"
                  type="button"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </>
    )
  );
};

export default Login;
