import React from 'react';
import { useNavigate } from 'react-router-dom';
import.meta.env.VITE_GOOGLE_CLIENT_ID;
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import MyContext from './MyContext';
import { useEffect, useContext, useRef } from 'react';
import axios from 'axios';
// const urlremote = `http://localhost:5000`;
const urlremote = `https://faithbridge.onrender.com`

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const navigate = useNavigate();
  const { setToken, token, setUserInfo, setIsAdmin } = useContext(MyContext);
  const dialogRef = useRef(null);

  useEffect(() => {
    //load member details
    if (!token) return;
    axios
      .get(`${urlremote}/api/members/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { member} = res.data;
        setUserInfo(member);
        setIsAdmin(res.data.isAdmin)
        // console.log(res.data.isAdmin)
      
      })
      .catch((error) => console.log('error fetching user', error));
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [token]);

  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    const res = await fetch('http://localhost:5000/api/auth/google-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    const data = await res.json();
    // console.log(data.token); // JWT token from backend
    localStorage.setItem('token', data.token);
    setToken(data.token);

   

    // redirect after login
    const destination = localStorage.getItem('redirectTo');

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
      {/* <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
             bg-dark rounded-lg p-6 shadow-lg z-50 w-96"
      >
        <h2 className="text-center text-2xl font-semibold mb-4 text-white">
          Login with your google account
        </h2>
        <form method="dialog" className="flex flex-col">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </GoogleOAuthProvider>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded m-auto w-1/2"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
        </form>
      </dialog> */}
    </>
  );
};

export default Login;
