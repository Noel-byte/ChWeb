import React from 'react';

const Footer = () => {
  return (
    <>
<div className="relative w-full bg-[#1F2937] text-white pt-6 pb-4">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Services */}
      <div>
        <h2 className="font-titles text-sm md:text-base mb-1">Services</h2>
        <ul className="space-y-0.5">
          <li className="font-titles text-xs">Baptism</li>
          <li className="font-titles text-xs">Holy Communion</li>
        </ul>
      </div>

      {/* Contacts */}
      <div>
        <h2 className="font-titles text-sm md:text-base mb-1">Contacts</h2>
        <ul className="space-y-0.5">
          <li className="font-titles text-xs">587-054-6852</li>
          <li className="font-titles text-xs">contact@church.org</li>
        </ul>
      </div>

      {/* Location */}
      <div>
        <h2 className="font-titles text-sm md:text-base mb-1">Location</h2>
        <ul className="space-y-0.5">
          <li className="font-titles text-xs">111 St 222 Ave NW</li>
          <li className="font-titles text-xs">Edmonton, AB</li>
          <li className="mt-0.5">
            <a href="#" className="text-blue-300 text-xs hover:underline">View Map</a>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h2 className="font-titles text-sm md:text-base mb-1">Connect</h2>
        <div className="flex space-x-3">
          <a href="#" className="text-white hover:text-blue-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a href="#" className="text-white hover:text-green-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.077,4.928C17.191,3.041,14.683,2.001,12.011,2c-5.506,0-9.987,4.479-9.989,9.985 c-0.001,2.689,1.066,5.265,2.966,7.168l0.026,0.026l-1.367,4.989l5.152-1.366c1.98,1.085,4.267,1.665,6.609,1.666 c5.505,0,9.986-4.48,9.989-9.985C22.001,9.325,20.963,6.814,19.077,4.928z M12.008,20.005c-1.934,0-3.813-0.551-5.43-1.586 l-0.387-0.229l-3.75,0.994l1.003-3.647l-0.24-0.378c-1.025-1.623-1.566-3.512-1.566-5.436c0.002-4.412,3.592-8.002,8.005-8.002 c2.146,0,4.182,0.835,5.709,2.348c1.527,1.514,2.369,3.534,2.369,5.68C20.002,16.416,16.412,20.005,12.008,20.005z M16.52,13.808 c-0.198-0.099-1.17-0.577-1.353-0.642c-0.182-0.065-0.315-0.099-0.447,0.099c-0.132,0.198-0.511,0.642-0.627,0.774 c-0.115,0.132-0.23,0.149-0.429,0.05c-0.198-0.1-0.838-0.308-1.595-0.985c-0.589-0.525-0.987-1.175-1.103-1.373 c-0.115-0.198-0.012-0.306,0.099-0.405c0.102-0.099,0.231-0.256,0.347-0.385c0.115-0.132,0.149-0.223,0.231-0.37 c0.083-0.149,0.042-0.277-0.02-0.385c-0.063-0.109-0.561-1.353-0.768-1.847c-0.198-0.48-0.396-0.416-0.561-0.424 c-0.144-0.008-0.312-0.008-0.48-0.008c-0.165,0-0.429,0.064-0.654,0.319c-0.224,0.256-0.858,0.838-0.858,2.045 c0,1.207,0.879,2.37,1,2.538c0.125,0.166,1.749,2.668,4.24,3.74c0.596,0.263,1.062,0.42,1.422,0.54 c0.596,0.188,1.138,0.162,1.566,0.099c0.479-0.074,1.47-0.6,1.678-1.18c0.208-0.58,0.208-1.077,0.146-1.181 C16.835,13.938,16.718,13.908,16.52,13.808z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-4 pt-3 border-t border-gray-700">
      <p className="text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} ቅዱስ ቁርባን ካቶኪካዊት ቤተክርስትያን. All rights reserved.
      </p>
    </div>
  </div>
</div>
    </>
  );
};

export default Footer;
