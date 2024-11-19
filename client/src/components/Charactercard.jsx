import React from 'react'

const Charactercard = ({ image, name, message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10 bg-neutralGrey p-4 drop-shadow-[6px_6px_6px_rgba(255,255,255,0.7)]">
      {/*  bubble */}
      <div className="relative bg-white text-black p-4 rounded-lg border-4 shadow-md mb-4 drop-shadow-[6px_6px_6px_rgba(0,0,0,0.5)]">
        <p>{message}</p>
        {/* tail of  bubble */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-6 h-6 bg-white rotate-45 border-4 shadow-sm"></div>
      </div>
    

      <img
        src={image}
        alt={name}
        className="w-40 h-40 rounded-full border-4 border-primary mb-2 drop-shadow-[6px_6px_6px_rgba(0,0,0,0.7)]"
      />

      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  )
}

export default Charactercard