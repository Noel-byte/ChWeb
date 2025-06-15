import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import MyContext from './MyContext';
import axios from 'axios';
// const urlremote = `http://localhost:5000`;
const urlremote = `https://faithbridge.onrender.com`;

const NavigationMenu = () => {
  const { token, isAdmin, setToken, setIsAdmin, isAdminOpen, setIsAdminOpen } =
    useContext(MyContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isSpirtualopen, setIsSpirtualOpen] = useState(false);
  const [isLifeEventsopen, setIsLifeEventsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // console.log(userInfo.email);

  const toggleAdminDropdown = () => {
    setIsAdminOpen((prev) => !prev);
    setIsServicesDropdownOpen(false);
    setIsDropdownOpen(false);
  };
  const toggleSpirtualServices = () => {
    setIsSpirtualOpen((prev) => !prev);
    setIsLifeEventsOpen(false);
  };
  const toggleLifeEvents = () => {
    setIsLifeEventsOpen((prev) => !prev);
    setIsSpirtualOpen(false);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen((prev) => !prev);
    setIsDropdownOpen(false);
    setIsAdminOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);

    setIsServicesDropdownOpen(false);
    setIsAdminOpen(false);
  };

  // const closeDropdown = () => {
  //   setIsDropdownOpen(false);
  // };

  // const handleLogin = () => {
  //   localStorage.setItem('token', token);
  //   setToken(token);
  // };

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
        setIsAdmin(res.data.isAdmin);
        console.log(res.data.isAdmin);
      })
      .catch((error) => console.log('error fetching user', error));
  }, [token]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setToken(null);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 z-20 w-screen text-white px-4 lg:px-10 py-4 font-button bg-nav backdrop-blur-md flex flex-wrap justify-between items-center">
      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-between w-3/4">
        <ul className="flex justify-between text-xl w-full">
          {/* Home */}
          <li>
            <Link
              to=""
              className="hover:text-stone-400 transition-colors duration-200"
            >
              ገዛ
            </Link>
          </li>

          {/* Admin Dropdown */}
          {token && isAdmin && (
            <li className="relative">
              <button
                onClick={toggleAdminDropdown}
                className="cursor-pointer hover:text-stone-400 transition-colors duration-200"
              >
                ኣድሚን ▾
              </button>
              {isAdminOpen && (
                <ul className="absolute left-0 w-48 mt-4 bg-nav/95 border border-stone-600 rounded-xl px-4 py-2 space-y-3 z-50 shadow-lg">
                  <li>
                    <Link
                      to="register"
                      className="hover:text-stone-400 block py-1"
                    >
                      ምዝገባ
                    </Link>
                  </li>
                  <li>
                    <Link to="post" className="hover:text-stone-400 block py-1">
                      ጽሑፍ ፍጠር
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Services Dropdown */}
          <li className="relative">
            <button
              onClick={toggleServicesDropdown}
              className="cursor-pointer hover:text-stone-400 transition-colors duration-200"
            >
              ኣገልግሎታት ▾
            </button>
            {isServicesDropdownOpen && (
              <ul className="absolute left-0 w-60 mt-4 bg-nav/95 border border-stone-600 rounded-xl px-4 py-3 space-y-4 z-50 shadow-lg">
                <li>
                  <button
                    onClick={toggleSpirtualServices}
                    className="w-full text-left hover:text-stone-400 flex justify-between items-center"
                  >
                    Spirtual Services <span>{isSpirtualopen ? '▲' : '▼'}</span>
                  </button>
                  {isSpirtualopen && (
                    <ul className="pl-4 mt-2 space-y-2 border-l border-stone-600">
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          Baptism
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          Holy Communion
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          Spritual Counseling
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li>
                  <button
                    onClick={toggleLifeEvents}
                    className="w-full text-left hover:text-stone-400 flex justify-between items-center"
                  >
                    Life Events <span>{isLifeEventsopen ? '▲' : '▼'}</span>
                  </button>
                  {isLifeEventsopen && (
                    <ul className="pl-4 mt-2 space-y-2 border-l border-stone-600">
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          Weddings
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          Funerals Services
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          First Communion
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Members Dropdown */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="cursor-pointer hover:text-stone-400 transition-colors duration-200"
            >
              ኣባላት ▾
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 w-48 mt-4 bg-nav/95 border border-stone-600 rounded-xl px-4 py-3 space-y-3 z-50 shadow-lg">
                <li>
                  <Link
                    to={token ? 'annualfee' : 'authenticate'}
                    className="hover:text-stone-400 block py-1"
                  >
                    ናይ ኣባልነት ክፍሊት
                  </Link>
                </li>
                <li>
                  {/* <Link 
                to={token ? 'donate' : 'authenticate'}
                className="hover:text-stone-400 block py-1 px-3 bg-green-700 rounded-lg text-center"
              >
                ወፈያ
              </Link> */}
                </li>
              </ul>
            )}
          </li>

          {/* Donate Button */}
          <li>
            <Link
              to={token ? 'donate' : 'authenticate'}
              className="font-bold border rounded-lg px-6 bg-green-500 hover:bg-green-600 py-1.5 text-xl transition-colors duration-200"
            >
              ወፈያ
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Auth Section */}
      <div className="flex items-center">
        {!token ? (
          <Link
            to="authenticate"
            className="hover:text-stone-400 transition-colors duration-200 p-2 rounded-full hover:bg-stone-800 flex items-center"
            aria-label="Login"
          >
            
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span className="sr-only">Login</span>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-stone-400 transition-colors duration-200 p-2 rounded-full hover:bg-stone-800 flex items-center"
            aria-label="Logout"
          >
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
            <span className="sr-only">Logout</span>
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full mt-4 bg-nav/95 border border-stone-600 rounded-xl py-4 px-6 transition-all duration-300">
          <ul className="space-y-4">
            <li>
              <Link to="" className="block py-2 hover:text-stone-400">
                ገዛ
              </Link>
            </li>

            {token && isAdmin && (
              <li>
                <button
                  onClick={toggleAdminDropdown}
                  className="w-full text-left py-2 hover:text-stone-400 flex justify-between items-center"
                >
                  ኣድሚን <span>{isAdminOpen ? '▲' : '▼'}</span>
                </button>
                {isAdminOpen && (
                  <ul className="pl-4 mt-2 space-y-3">
                    <li>
                      <Link
                        to="register"
                        className="block py-1 hover:text-stone-400"
                      >
                        ምዝገባ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="post"
                        className="block py-1 hover:text-stone-400"
                      >
                        ጽሑፍ ፍጠር
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <li>
              <button
                onClick={toggleServicesDropdown}
                className="w-full text-left py-2 hover:text-stone-400 flex justify-between items-center"
              >
                ኣገልግሎታት <span>{isServicesDropdownOpen ? '▲' : '▼'}</span>
              </button>
              {isServicesDropdownOpen && (
                <ul className="pl-4 mt-2 space-y-4">
                  <li>
                    <button
                      onClick={toggleSpirtualServices}
                      className="w-full text-left py-1 hover:text-stone-400 flex justify-between items-center"
                    >
                      Spirtual Services{' '}
                      <span>{isSpirtualopen ? '▲' : '▼'}</span>
                    </button>
                    {isSpirtualopen && (
                      <ul className="pl-4 mt-2 space-y-2">
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            Baptism
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            Holy Communion
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            Spritual Counseling
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <button
                      onClick={toggleLifeEvents}
                      className="w-full text-left py-1 hover:text-stone-400 flex justify-between items-center"
                    >
                      Life Events <span>{isLifeEventsopen ? '▲' : '▼'}</span>
                    </button>
                    {isLifeEventsopen && (
                      <ul className="pl-4 mt-2 space-y-2">
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            Weddings
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            Funerals Services
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            First Communion
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                onClick={toggleDropdown}
                className="w-full text-left py-2 hover:text-stone-400 flex justify-between items-center"
              >
                ኣባላት <span>{isDropdownOpen ? '▲' : '▼'}</span>
              </button>
              {isDropdownOpen && (
                <ul className="pl-4 mt-2 space-y-3">
                  <li>
                    <Link
                      to={token ? 'annualfee' : 'authenticate'}
                      className="block py-1 hover:text-stone-400"
                    >
                      ናይ ኣባልነት ክፍሊት
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to={token ? 'donate' : 'authenticate'}
                className="inline-block font-bold border rounded-lg px-6 bg-green-500 hover:bg-green-600 py-2 text-xl mt-2 w-full text-center"
              >
                ወፈያ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
