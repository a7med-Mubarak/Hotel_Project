import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function MasterLayout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>

  )
}
