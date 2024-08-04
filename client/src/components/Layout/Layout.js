import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <>
    <Header/>
    <main style={{minHeight : "71vh"}}>{props.children}</main>
    <Footer/>
    </>
  )
}

export default Layout