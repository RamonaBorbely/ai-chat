import React from 'react'
import NewCharCard from '../components/NewCharCard'
import { characterData } from '../text'

const NewAbout = () => {
  return (
    <div className='bg-primary h-screen'> 
      <h1 className='text-4xl text-center font-bold text-white drop-shadow-[6px_6px_6px_rgba(0,0,0,1)] py-4'>About Us</h1>
      <div className='flex flex-col gap-10'>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {characterData.map((character) => (
              <NewCharCard
                key={character.id}
                image={character.image}
                name={character.name}
                message={character.message}
              />
            ))}
          </div>

          <div>
            <p className='m-20 bg-secondary p-2 drop-shadow-[6px_6px_6px_rgba(255,255,255,0.7)] text-center'>
              At Character AI, we set out to bring history, creativity, and wisdom to life through AI-driven conversations. 
              We wanted to create a platform where users could interact with iconic personalities, 
              explore unique perspectives, and learn from virtual characters representing diverse 
              backgrounds.
              Our mission is to make knowledge and inspiration accessible, engaging, and fun. Whether 
              you are seeking business advice from a visionary, royal insights from a historical figure, 
              or hero-inspired strategies, Character AI offers a unique experience tailored to your 
              curiosity. We hope you enjoy chatting with these AI characters as much as we enjoyed 
              creating them!
            </p>
          </div>
      </div>
  
      </div> 
  )
}

export default NewAbout