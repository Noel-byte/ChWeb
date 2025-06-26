import React from 'react';
import {  useContext, useState , useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logout from '../pages/Logout'

import { Link } from 'react-router-dom';
import MyContext from './MyContext';
import { LanguageContext } from './LanguageContext';
import axios from 'axios'

const NavigationMenu = () => {
  const {
    isAdmin,
    setIsAdmin,
    setIsLoggedIn,
    setUserInfo,
    isAdminOpen,
    setIsAdminOpen,
    isLoggedIn,
  } = useContext(MyContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  // const [isSpirtualopen, setIsSpirtualOpen] = useState(false);
  // const [isLifeEventsopen, setIsLifeEventsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, changeLang } = useContext(LanguageContext);

  const { t } = useTranslation();

  // const navigate = useNavigate();

  const toggleAdminDropdown = () => {
    setIsAdminOpen((prev) => !prev);
    // setIsServicesDropdownOpen(false);
    setIsDropdownOpen(false);
  };
  // const toggleSpirtualServices = () => {
  //   setIsSpirtualOpen((prev) => !prev);
  //   setIsLifeEventsOpen(false);
  // };
  // const toggleLifeEvents = () => {
  //   setIsLifeEventsOpen((prev) => !prev);
  //   setIsSpirtualOpen(false);
  // };

  // const toggleServicesDropdown = () => {
  //   setIsServicesDropdownOpen((prev) => !prev);
  //   setIsDropdownOpen(false);
  //   setIsAdminOpen(false);
  // };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);

    // setIsServicesDropdownOpen(false);
    setIsAdminOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/api/members/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsAdmin(res.data.isAdmin);
        setUserInfo(res.data.member);
        setIsLoggedIn(true)
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [setUserInfo,setIsLoggedIn,setIsAdmin]);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   setIsAdmin(false);
  //   navigate('/');
  // };

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
              {t('home')}
            </Link>
          </li>

          {/* Admin Dropdown */}
          {(isLoggedIn && isAdmin) && (
            <li className="relative">
              <button
                onClick={toggleAdminDropdown}
                className="cursor-pointer hover:text-stone-400 transition-colors duration-200"
              >
                {t('admin')}
              </button>
              {isAdminOpen && (
                <ul className="absolute left-0 w-48 mt-4 bg-nav/95 border border-stone-600 rounded-xl px-4 py-2 space-y-3 z-50 shadow-lg">
                  <li>
                    <Link
                      to="register"
                      className="hover:text-stone-400 block py-1"
                    >
                      {t('registration')}
                    </Link>
                  </li>
                  <li>
                    <Link to="post" className="hover:text-stone-400 block py-1">
                      {t('post')}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Services Dropdown */}
          {/* <li className="relative">
            <button
              onClick={toggleServicesDropdown}
              className="cursor-pointer hover:text-stone-400 transition-colors duration-200"
            >
              {t('services')}
            </button>
            {isServicesDropdownOpen && (
              <ul className="absolute left-0 w-60 mt-4 bg-nav/95 border border-stone-600 rounded-xl px-4 py-3 space-y-4 z-50 shadow-lg">
                <li>
                  <button
                    onClick={toggleSpirtualServices}
                    className="w-full text-left hover:text-stone-400 flex justify-between items-center"
                  >
                    comming soon... <span>{isSpirtualopen ? '▲' : '▼'}</span>
                  </button>
                  {isSpirtualopen && (
                    <ul className="pl-4 mt-2 space-y-2 border-l border-stone-600">
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          comming soon...
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          comming soon...
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          comming soon...
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
                    comming soon... <span>{isLifeEventsopen ? '▲' : '▼'}</span>
                  </button>
                  {isLifeEventsopen && (
                    <ul className="pl-4 mt-2 space-y-2 border-l border-stone-600">
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          comming soon...
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          comming soon...
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="hover:text-stone-400 block">
                          comming soon...
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li> */}

          {/* Members Dropdown */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="cursor-pointer hover:text-stone-400 transition-colors duration-200"
            >
              {t('members')}
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 w-48 mt-4 bg-nav/95 border border-stone-600 rounded-xl px-4 py-3 space-y-3 z-50 shadow-lg">
                <li>
                  <Link
                    to={isLoggedIn ? 'annualfee' : 'authenticate'}
                    className="hover:text-stone-400 block py-1"
                    onClick={() => {
                      if (!isLoggedIn)
                        localStorage.setItem('redirectTo', 'annualfee');
                    }}
                  >
                    {t('membersfee')}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Donate Button */}
          <li>
            <Link
              to={isLoggedIn ? 'donate' : 'authenticate'}
              className="font-bold border rounded-lg px-6 bg-green-500 hover:bg-green-600 py-1.5 text-xl transition-colors duration-200"
              onClick={() => {
                if (!isLoggedIn) localStorage.setItem('redirectTo', 'donate');
              }}
            >
              {t('donate')}
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
      {/* language toggle section */}
      <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <button
          onClick={() => changeLang('en')}
          className={`px-4 py-2 text-sm font-medium hover:cursor-pointer ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          English
        </button>
        <button
          onClick={() => changeLang('tg')}
          className={`px-4 py-2 text-sm font-medium hover:cursor-pointer ${
            language === 'tg'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          ትግርኛ
        </button>
      </div>

      {/* Auth Section */}
      <div className="flex items-center">
        {!isLoggedIn ? (
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
          <Logout/>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full mt-4 bg-nav/95 border border-stone-600 rounded-xl py-4 px-6 transition-all duration-300">
          <ul className="space-y-4">
            <li>
              <Link to="" className="block py-2 hover:text-stone-400">
                {t('home')}
              </Link>
            </li>

            {isLoggedIn && isAdmin && (
              <li>
                <button
                  onClick={toggleAdminDropdown}
                  className="w-full text-left py-2 hover:text-stone-400 flex justify-between items-center"
                >
                  {t('admin')} <span>{isAdminOpen ? '▲' : '▼'}</span>
                </button>
                {isAdminOpen && (
                  <ul className="pl-4 mt-2 space-y-3">
                    <li>
                      <Link
                        to="register"
                        className="block py-1 hover:text-stone-400"
                      >
                        {t('registration')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="post"
                        className="block py-1 hover:text-stone-400"
                      >
                        {t('post')}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* <li>
              <button
                onClick={toggleServicesDropdown}
                className="w-full text-left py-2 hover:text-stone-400 flex justify-between items-center"
              >
                {t('services')}{' '}
                <span>{isServicesDropdownOpen ? '▲' : '▼'}</span>
              </button>
              {isServicesDropdownOpen && (
                <ul className="pl-4 mt-2 space-y-4">
                  <li>
                    <button
                      onClick={toggleSpirtualServices}
                      className="w-full text-left py-1 hover:text-stone-400 flex justify-between items-center"
                    >
                      comming soon... <span>{isSpirtualopen ? '▲' : '▼'}</span>
                    </button>
                    {isSpirtualopen && (
                      <ul className="pl-4 mt-2 space-y-2">
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            comming soon...
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            comming soon...
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            comming soon...
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
                      comming soon...{' '}
                      <span>{isLifeEventsopen ? '▲' : '▼'}</span>
                    </button>
                    {isLifeEventsopen && (
                      <ul className="pl-4 mt-2 space-y-2">
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            comming soon...
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            comming soon...
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="block py-1 hover:text-stone-400"
                          >
                            comming soon...
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li> */}

            <li>
              <button
                onClick={toggleDropdown}
                className="w-full text-left py-2 hover:text-stone-400 flex justify-between items-center"
              >
                {t('members')} <span>{isDropdownOpen ? '▲' : '▼'}</span>
              </button>
              {isDropdownOpen && (
                <ul className="pl-4 mt-2 space-y-3">
                  <li>
                    <Link
                      to={isLoggedIn ? 'annualfee' : 'authenticate'}
                      className="block py-1 hover:text-stone-400"
                      onClick={() => {
                        if (!isLoggedIn)
                          localStorage.setItem('redirectTo', 'annualfee');
                      }}
                    >
                      {t('membersfee')}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to={isLoggedIn ? 'donate' : 'authenticate'}
                className="inline-block font-bold border rounded-lg px-6 bg-green-500 hover:bg-green-600 py-2 text-xl mt-2 w-full text-center"
                onClick={() => {
                  if (!isLoggedIn) localStorage.setItem('redirectTo', 'donate');
                }}
              >
                {t('donate')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;
