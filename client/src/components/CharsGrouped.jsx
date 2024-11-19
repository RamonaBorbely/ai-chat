import React from 'react';
import batman from '../assets/batman.jpg';
import trump from '../assets/trump.png';
import queen from '../assets/queen.png';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const CharsGrouped = () => {
  return (
    <div className="relative w-full h-20 flex justify-between items-cente drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]">
        <div className=''>
            <Link to='/'>
            <img src={logo} alt="" className='h-20 w-20 rounded-full' />
            </Link>
        </div>
      {/* Parent container */}
      <div className="relative w-20 h-20 bg-white rounded-full">
        {/* Top image */}
        <img
          src={batman}
          alt="Batman"
          className="h-10 w-10 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"
        />
        {/* Bottom-left image */}
        <img
          src={queen}
          alt="Queen Elizabeth"
          className="h-10 w-10  rounded-full absolute top-8 left-6 transform -translate-x-1/2"
        />
        {/* Bottom-right image */}
        <img
          src={trump}
          alt="Donald Trump"
          className="h-10 w-10  rounded-full absolute top-8 left-6 transform translate-x-1/2"
        />
      </div>
    </div>
  );
};

export default CharsGrouped;
