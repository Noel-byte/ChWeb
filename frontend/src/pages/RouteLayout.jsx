import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';
import Footer from '../components/Footer';
import churchImage from '../assets/church.jpg';

const RouteLayout = () => {
  return (
    <>
      <div className="relative min-h-screen">
        {/* navigation */}
        <NavigationMenu />
        {/* background image */}
        <img
          src={churchImage}
          alt="church background"
          className="fixed inset-0 h-full w-full object-cover filter brightness-40"
        />
        {/* welcome message */}
        <div className="text-5xl fixed top-20 w-screen text-center font-titles  leading-20 text-stone-400 z-10">
          <h1>St. Mary's Eritrean Catholic Church</h1>
          <p className="text-2xl mt-2 text-white font-mono pb-2">
            "A house of prayer for all people" - Isaiah 56:7
          </p>
          <hr />
        </div>

        {/* page content */}

        <div className="relative z-10 px-4 pt-8 ">
          <Outlet />
        </div>

        <div className="relative">
          {/* footer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RouteLayout;
