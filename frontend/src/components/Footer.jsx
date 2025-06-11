import React from 'react';

const Footer = () => {
  return (
    <>
      <svg
        className="w-full"
        viewBox="0 0 1440 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#1F2937"
         d="M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,154.7C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128V320H0Z"
        />
      </svg>

      <div className="w-screen bg-[#1F2937] px-2 text-white mt-[-1px] ">
        <div className="flex flex-wrap justify-evenly items-start py-6 gap-8">
          {/* Services */}
          <div className="min-w-[180px]">
            <h2 className="font-titles underline text-2xl mb-3">Services</h2>
            <ul className="list-disc list-inside text-lg space-y-2 pl-4 md:text-xl font-titles">
              <li>Baptism</li>
              <li>Holy Communion</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="min-w-[180px]">
            <h2 className="font-titles underline text-2xl mb-3">Contacts</h2>
            <ul className="list-disc list-inside text-lg space-y-2 pl-4 md:text-xl font-titles">
              <li>X - 5870546-8521</li>
              <li>Y - 5870546-8521</li>
            </ul>
          </div>

          {/* Location */}
          <div className="min-w-[180px]">
            <h2 className="font-titles underline text-2xl mb-3">Location</h2>
            <ul className="list-disc list-inside text-lg space-y-2 pl-4 md:text-xl font-titles">
              <li>111 st 222 ave Edmonton</li>
              <li>Google Map</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="min-w-[180px]">
            <h2 className="font-titles underline text-2xl mb-3">
              Social-media
            </h2>
            <ul className="list-disc list-inside text-lg space-y-2 pl-4 md:text-xl font-titles">
              <li>Facebook</li>
              <li>WhatsApp</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 py-2 font-titles">
          &copy; 2025 Created by @----- All rights reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
