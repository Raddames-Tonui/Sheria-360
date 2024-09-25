import React from 'react'
import Navbar from './components/NavBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout