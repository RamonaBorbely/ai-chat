import React from 'react'
import { Link } from 'react-router-dom'


// this component is just for CTA 
const ButtonCTA = ({ text, to, className}) => {
  return (
    <Link 
      to={to} 
      className={`py-2 px-4 rounded " hover:scale-110 transition-transform duration-200 text-white font-bold ${className}`}
    >
      {text}
    </Link>
  )
}

export default ButtonCTA