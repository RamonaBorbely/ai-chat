import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MainLayout = () => {
  const { user } = useAuth()
  const location = useLocation()

  // list of routes where the header component wont be visible when user is authenticated
  const protectedRoutes = ['/userDashboard', '/chat']

  const shouldShowHeader = !user || !protectedRoutes.some(route => location.pathname.startsWith(route))
  return (
    <>
        {shouldShowHeader &&  <Header />}
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default MainLayout