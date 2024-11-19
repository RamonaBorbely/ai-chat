import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className='fixed bottom-0 bg-white text-primary w-screen flex items-center justify-center'>
      {year} &copy; Character AI
    </div>
  )
}

export default Footer