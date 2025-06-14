import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';
import Footer from '../components/Footer';
import churchImage from '../assets/church.jpg';

const RouteLayout = () => {
  return (
    <>
    <div className="relative min-h-screen flex flex-col">
  {/* Background image */}
  <img
    src={churchImage}
    alt="church background"
    className="fixed inset-0 h-full w-full object-cover object-center brightness-40"
  />

  {/* Navigation */}
  <div className="fixed top-0 w-full z-20">
    <NavigationMenu />
  </div>

  {/* Welcome message */}
  <div className="relative z-10 pt-24 pb-8 px-4 text-center md:pt-32">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-titles text-stone-300 leading-tight">
      ቅዱስ ቁርባን ካቶኪካዊት ቤተክርስትያን
    </h1>
    <p className="text-base sm:text-lg md:text-xl mt-3 text-stone-200 font-mono max-w-3xl mx-auto">
      "A house of prayer for all people" - Isaiah 56:7
    </p>
    <div className="mt-6 w-24 h-0.5 bg-stone-500 mx-auto"></div>
  </div>

  {/* Page content */}
  <main className="relative z-10 px-4 pb-16 flex-grow">
    <Outlet />
  </main>

  {/* Footer */}
  <div className="relative z-10">
    <Footer />
  </div>
</div>
      {/* <div className="relative min-h-screen"> */}
        {/* navigation */}
        <NavigationMenu />
        {/* background image */}
        {/* <img
          src={churchImage}
          alt="church background"
          className="fixed inset-0 h-full w-full object-cover filter brightness-40"
        /> */}
        {/* welcome message */}
        {/* <div className="text-5xl fixed top-20 w-screen text-center font-titles  leading-20 text-stone-400 z-10">
          <h1>ቅዱስ ቁርባን ካቶኪካዊት ቤተክርስትያን</h1>
          <p className="text-2xl mt-2 text-white font-mono pb-2">
            "A house of prayer for all people" - Isaiah 56:7
          </p>
          <hr />
        </div> */}

        {/* page content */}

        {/* <div className="relative z-10 px-4 pt-8 ">
          <Outlet />
        </div> */}

        {/* <div className="relative"> */}
          {/* footer */}
          {/* <Footer /> */}
        {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default RouteLayout;
