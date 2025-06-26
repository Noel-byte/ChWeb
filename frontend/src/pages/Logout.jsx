import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import MyContext from '../components/MyContext';

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAdmin, setUserInfo, setIsLoggedIn } = useContext(MyContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      console.log('logged out successfully')
    } catch (err) {
      console.log('Logout failed:', err);
    }

    //clear client-side context state
    setIsAdmin(false);
    setUserInfo(null);
    setIsLoggedIn(false);

    navigate('/');
  };
  return (
    <span className="text-2xl hover:cursor-pointer" onClick={handleLogout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
    </span>
  );
};

export default Logout;
