import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';
import Footer from '../components/Footer';
import churchImage from '../assets/church.jpg';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import SCRIPTURES from '../Scriptures';

const RouteLayout = () => {
  const [message, setMessage] = useState(
    SCRIPTURES[Math.floor(Math.random() * SCRIPTURES.length)]
  );
  const [fade, setFade] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setMessage((prev) => {
          let next;
          do {
            next = SCRIPTURES[Math.floor(Math.random() * SCRIPTURES.length)];
          } while (next === prev);
          return next;
        });
        setFade(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);
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
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-titles text-stone-300 leading-tight`}
          >
            {t('homepageheader')}
          </h1>
          <p
            className={`transition-opacity duration-500 ease-in-out ${
              fade ? 'opacity-100' : 'opacity-0'
            }  text-base sm:text-lg md:text-xl mt-3 text-stone-200 font-mono max-w-3xl mx-auto`}
          >
            "{t('homepagemessage', { message: message.split('-')[0] })}"{' '}
            {t('name', { name: message.split('-')[1] })}
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
    </>
  );
};

export default RouteLayout;
