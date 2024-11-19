import React from 'react'

const HomeCard = ({title, text}) => {
  return (
    <div className='bg-secondary p-4 flex flex-col drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]'>
        <h1 className='font-bold text-2xl text-primary text-center'>{title}</h1>
        <p className='font-semi text-neutralGrey p-4 text-center'>{text}</p>
    </div>
  )
}

export default HomeCard