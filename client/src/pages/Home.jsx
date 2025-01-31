import React from 'react';
import { homeCardtext } from '../text';
import HomeCard from '../components/HomeCard';
import ButtonCTA from '../components/ButtonCTA';
import batman from '../assets/batman.jpg'
import trump from '../assets/trump.png'
import queen from '../assets/queen.png'

const Home = () => {
  return (
    <div className="w-screen h-screen bg-primary font-sans">
      {/* Hero Section */}
      <div className="relative h-[400px] w-screenflex">

        <div className="absolute inset-0 bg-black bg-opacity-30" />    

        <div className="bg-heroImg2 bg-cover bg-center h-full flex flex-col justify-center items-center px-8 md:px-16 gap-4  ">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]">
              Step Into the Future of AI Conversations
            </h1>
            <p className=" md:text-xl mb-6 drop-shadow-[6px_6px_6px_rgba(0,0,0,0.9)] bg-white rounded-md px-2">
              Experience real-time chats with iconic AI personas like Batman, Queen Elizabeth II, and Donald Trump.
            </p>

            <div className="flex gap-4 z-20">
            <ButtonCTA
              to="/contact"
              text="Contact Us Here"
              className="bg-secondary hover:bg-secondary-dark drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]"
            />
            <ButtonCTA
              to="/newabout"
              text="Learn More About Us"
              className="bg-primary hover:bg-primary-dark drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]"
            />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {homeCardtext.map((item) => (
            <HomeCard
              title={item.title}
              text={item.text}
              key={item.id}
            />
          ))}
        </div>
      </div>

    {/* Caracters Rolling */}
      <div className='flex mt-14 justify-center gap-4'>
            <img src={batman} alt="" className='h-20 w-20 rounded-full hover:scale-150 transition-transform duration-200 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]'/>
            <img src={trump} alt="" className='h-20 w-20 rounded-full hover:scale-150 transition-transform duration-200 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]'/>
            <img src={queen} alt="" className='h-20 w-20 rounded-full hover:scale-150 transition-transform duration-200 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]'/>
      </div>
    </div>
  );
};

export default Home;
