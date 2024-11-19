import React from 'react'
import { User } from 'lucide-react'
const UserDashboard = () => {
  return (
    <div className='flex flex-col mt-20 bg-red-500'>
      <div className='flex justify-around'>
        <h1>Userdashboard</h1>
        <p>This is a protected page</p>
        <User />
      </div>
      {/* */}
    </div>
  )
}

export default UserDashboard