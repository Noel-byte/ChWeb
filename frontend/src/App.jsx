import Registration from './pages/Registration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteLayout from './pages/RouteLayout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Services from './pages/Services';
import Donate from './pages/Donate';
import Success from './pages/Success';
import DonationCanceled from './pages/DonationCanceled';
import Login from './components/Login';
import AnnualFee from './pages/AnnualFee';
import { useState,useEffect } from 'react';
import MyContext from './components/MyContext';
import PaymentSuccess from './pages/PaymentSuccess';
import CreatePost from './pages/CreatePost';
import Logout from './pages/Logout';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {


  const [feeAmount, setFeeAmount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [content, setContent] = useState('');
  const [userInfo, setUserInfo] = useState({
    memberid: '',
    firstname: '',
    email: '',
    lastname: '',
    membershiptype: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = createBrowserRouter([
    {
      path: '',
      element: <RouteLayout />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },

        {
          path: 'register',
          element: <Registration />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'services',
          element: <Services />,
        },
        {
          path: 'authenticate',
          element: <Login />,
        },
        {
          path: '/annualfee',
          element: <AnnualFee />,
        },

        {
          path: '/donate',
          element: <Donate />,
        },
        {
          path: 'donation-success',
          element: <Success />,
        },
        {
          path: 'donation-canceled',
          element: <DonationCanceled />,
        },
        {
          path: 'payment-success',
          element: <PaymentSuccess />,
        },
        {
          path: 'post',
          element: <CreatePost />,
        },
        {
          path: 'logout',
          element: <Logout />,
        },
      ],
    },
  ]);

    useEffect(() => {
    // Try to refresh access token on app start
    axios.get('/api/auth/refresh', { withCredentials: true })
      .then(() => {
        console.log('Access token refreshed ✅');
      })
      .catch(() => {
        console.log('No valid refresh token, user must log in.');
      });
  }, []);
  return (
    <MyContext
      value={{
        feeAmount,
        setFeeAmount,
        userInfo,
        setUserInfo,
        isAdmin,
        setIsAdmin,
        isAdminOpen,
        setIsAdminOpen,
        content,
        setContent,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </MyContext>
  );
}

export default App;
