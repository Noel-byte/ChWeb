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
import { useState } from 'react';
import MyContext from './components/MyContext';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminRegister from './pages/AdminRegister';
import CreatePost from './pages/CreatePost';
import Logout from './pages/Logout';
import { Toaster } from 'react-hot-toast';

function App() {
  const [feeAmount, setFeeAmount] = useState(0);
  const [admintoken, setAdminToken] = useState();
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
  const [token, setToken] = useState(localStorage.getItem('token'));
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
          path: 'admin',
          element: <AdminRegister />,
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
  return (
    <MyContext
      value={{
        feeAmount,
        setFeeAmount,
        userInfo,
        setUserInfo,
        token,
        setToken,
        admintoken,
        setAdminToken,
        isAdmin,
        setIsAdmin,
        isAdminOpen,
        setIsAdminOpen,
        content,
        setContent,
      }}
    >
      <RouterProvider router={router} />
      <Toaster position='top-center' reverseOrder={false}/>
    </MyContext>
  );
}

export default App;
