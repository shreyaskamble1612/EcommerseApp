import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast'
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
    <Helmet>
      <meta charSet='utf-8'/>
      
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
        <meta name='author' content={author}></meta>

      <title>{title}</title>


    </Helmet>
  
    <Header/>
    <main style={{minHeight : "71vh"}}>
      <Toaster/>
      {children}
    </main>
    <Footer/>
    </>
  )
}

Layout.defaultProps = {
  title: "EcommerceWeb",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics,MERNSTACK",
  author: "EcommerceDev"
}

export default Layout