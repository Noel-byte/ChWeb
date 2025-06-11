import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import MyContext from './MyContext';
import axios from 'axios';
const urllocal = `http://localhost:5000`;

const NavigationMenu = () => {
  const { token, isAdmin, setToken, setIsAdmin, isAdminOpen, setIsAdminOpen } =
    useContext(MyContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isSpirtualopen, setIsSpirtualOpen] = useState(false);
  const [isLifeEventsopen, setIsLifeEventsOpen] = useState(false);

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

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogin = () => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  useEffect(() => {
    //load member details
    if (!token) return;
    axios
      .get(`${urllocal}/api/members/user`, {
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
    <nav className=" fixed top-0 left-0 z-20 w-screen  text-white px-10 py-4  font-button flex justify-between">
      <ul className="flex justify-between text-2xl  w-3/4">
        <li>
          <Link to="" className="hover:text-stone-400 font-buttons">
            Home
          </Link>
        </li>

        {token && isAdmin && (
          <li className="relative">
            {/* <Link to="" className="hover:text-stone-400 font-buttons"> */}
            <button
              onClick={toggleAdminDropdown}
              className="cursor-pointer hover:text-stone-400"
            >
              Admin ▾
            </button>
            {/* </Link> */}

            {isAdminOpen && (
              <ul className="absolute left-0 w-70 mt-4 flex-col bg-nav/95 border border-stone-600 rounded-xl px-4 py-2 space-y-6 z-50 transition-all duration-200 ease-in-out">
                <li>
                  <Link
                    to="register"
                    className="hover:text-stone-400 font-buttons"
                  >
                    Registration
                  </Link>
                </li>
                <li>
                  <Link to="post" className="hover:text-stone-400 font-buttons">
                    CreatePost
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        <li className="relative">
          <button
            onClick={toggleServicesDropdown}
            className="cursor-pointer hover:text-stone-400 font-buttons"
          >
            Services ▾
          </button>

          {isServicesDropdownOpen && (
            <ul className="absolute left-0 w-70 mt-4 flex-col bg-nav/95 border border-stone-600 rounded-xl px-4 py-2 space-y-6 z-50 transition-all duration-200 ease-in-out">
              <li className="relative group">
                <Link
                  to=""
                  onClick={() => {
                    localStorage.setItem('redirectTo', ''),
                      toggleSpirtualServices();
                  }}
                  className="hover:text-stone-400 font-buttons py-1 text-xl"
                >
                  Spirtual Services
                </Link>
                {isSpirtualopen && (
                  <ul className="font-titles text-lg  absolute left-68 bg-nav/95 z-50 px-4 py-1 space-y-2 w-60 rounded">
                    <li
                      onClick={() => {
                        setIsSpirtualOpen(false),
                          setIsServicesDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer hover:text-stone-400 transition ease-in-out duration-75"
                    >
                      Baptism
                    </li>
                    <li
                      onClick={() => {
                        setIsSpirtualOpen(false),
                          setIsServicesDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer hover:text-stone-400 transition ease-in-out duration-75"
                    >
                      Holy Communion
                    </li>
                    <li
                      onClick={() => {
                        setIsSpirtualOpen(false),
                          setIsServicesDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer hover:text-stone-400 transition ease-in-out duration-75"
                    >
                      Spritual Counseling
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to=""
                  onClick={() => {
                    localStorage.setItem('redirectTo', ''), toggleLifeEvents();
                  }}
                  className="hover:text-stone-400 font-button text-xl"
                >
                  Life Events / Sacraments
                </Link>

                {isLifeEventsopen && (
                  <ul className="font-titles text-lg  absolute left-70 bg-nav/95 z-50 px-4 py-1 space-y-2 w-60 rounded  leading-relaxed">
                    <li
                      onClick={() => {
                        setIsLifeEventsOpen(false),
                          setIsServicesDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer hover:text-stone-400 transition ease-in-out duration-75"
                    >
                      Weddings
                    </li>
                    <li
                      onClick={() => {
                        setIsLifeEventsOpen(false),
                          setIsServicesDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer hover:text-stone-400 transition ease-in-out duration-75"
                    >
                      Funerals Services
                    </li>
                    <li
                      onClick={() => {
                        setIsLifeEventsOpen(false),
                          setIsServicesDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer hover:text-stone-400 transition ease-in-out duration-75"
                    >
                      First Communion
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        <li className="relative">
          <button
            onClick={toggleDropdown}
            className="cursor-pointer hover:text-stone-400 font-buttons"
          >
            Support Us ▾
          </button>

          {isDropdownOpen && (
            <ul className="absolute  left-0 w-70 mt-4 flex-col bg-nav/95 border border-stone-600 rounded-xl px-4 py-2 space-y-6 z-50 transition-all duration-200 ease-in-out">
              <li>
                <Link
                  to={token ? 'annualfee' : 'authenticate'}
                  onClick={() => {
                    localStorage.setItem('redirectTo', 'annualfee'),
                      closeDropdown();
                  }}
                  className="hover:text-stone-400 font-buttons py-1 text-xl"
                >
                  Membership Fee
                </Link>
              </li>

              <li>
                <Link
                  to={token ? 'donate' : 'authenticate'}
                  onClick={() => {
                    localStorage.setItem('redirectTo', 'donate'),
                      closeDropdown();
                  }}
                  className="hover:text-stone-400 font-buttons py-1 border rounded-lg px-3 bg-green-900 text-xl"
                >
                  Give Now
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            to={token ? 'donate' : 'authenticate'}
            onClick={() => {
              localStorage.setItem('redirectTo', 'donate'), closeDropdown();
            }}
            className="hover:text-stone-400 font-bold border rounded-lg px-10 bg-green-500 text-2xl py-2"
          >
            Give Now
          </Link>
        </li>
      </ul>
      <div>
        {!token ? (
          <Link
            to="authenticate"
            onClick={() => {
              localStorage.setItem('redirectTo', 'home'), handleLogin;
            }}
            className="hover:cursor-pointer text-3xl font-buttons"
          >
            Login
          </Link>
        ) : (
          <span
            onClick={handleLogout}
            className="hover:cursor-pointer text-3xl font-buttons hover:text-stone-400"
          >
            Logout
          </span>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;
