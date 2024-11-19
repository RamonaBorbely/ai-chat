import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import ButtonCTA from './ButtonCTA'


const Header = () => {
  return (
    <div className='flex justify-between mr-8 items-center'>
      <div>
        <Link to='/'>
          <img 
            src={logo} alt="Logo" 
            className='h-14'
        />
        </Link>
      </div>

      <div className='flex gap-4'>
        <ButtonCTA to='/register' text='Sing Up' className='bg-secondary'/>
        <ButtonCTA to='/login' text='Login' className='bg-primary'/>
      </div>
    </div>
  )
}

export default Header