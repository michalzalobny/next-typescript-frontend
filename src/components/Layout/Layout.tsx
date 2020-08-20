import React from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../Navbar/Navbar'
import FlashMessages from '../FlashMessages/FlashMessages'
// focus-visible used to highlight only when tab (styles in _base.scss)
import 'focus-visible'
import Footer from '../Footer/Footer'
import CookieInfo from '../CookieInfo/CookieInfo'

const LogerNoSSR = dynamic(() => import('../Loger/Loger'), {
  ssr: false,
})

type Props = {
  children: React.ReactNode
}

const Layout = React.memo<Props>((props) => {
  return (
    <>
      <Navbar />
      <CookieInfo />
      <FlashMessages />
      <LogerNoSSR />
      <div className="page-min-height">{props.children}</div>
      <Footer />
    </>
  )
})

export default Layout
