import React from 'react'
import { Outlet } from 'react-router-dom' 
import Header from './components/Header/Header'
import Footer from './components/Folder/Footer'

function Layout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout