import React from 'react'
import Cookies from 'universal-cookie'
import type { AppProps, AppContext } from 'next/app'
import Layout from '../components/Layout/Layout'
import AuthContextProvider from '../Context/AuthContext'
import LogerContextProvider from '../Context/LogerContext'
import FlashContextProvider from '../Context/FlashContext'
import LanguageContextProvider from '../Context/LanguageContext'
import '../sass/main.scss'
import { Language } from '../../types/sharedTypes'
import HostNameProvider from '../Context/HostNameContext'
import { AuthComponent } from '../components/AuthComponent/AuthComponent'
import { defineInitialLanguage } from '../Language/defineInitialLanguage'

type Props = {
  initialLanguage: Language
  hostName: string
}

const MyApp = (props: Props & AppProps) => {
  const { Component, pageProps, initialLanguage, hostName } = props

  return (
    <HostNameProvider hostName={hostName}>
      <LanguageContextProvider initialLanguage={initialLanguage}>
        <FlashContextProvider>
          <AuthContextProvider>
            <LogerContextProvider>
              <Layout>
                <AuthComponent>
                  <Component {...pageProps} />
                </AuthComponent>
              </Layout>
            </LogerContextProvider>
          </AuthContextProvider>
        </FlashContextProvider>
      </LanguageContextProvider>
    </HostNameProvider>
  )
}

MyApp.getInitialProps = async (c: AppContext) => {
  const cookies = new Cookies(c.ctx.req?.headers.cookie)

  const browserLang = c.ctx.req?.headers['accept-language']?.toLocaleLowerCase().substring(0, 2)
  const cookieLang = cookies.get('cookie-lang')

  const initialLanguage = defineInitialLanguage({ browserLang, cookieLang })

  const hostName = c.ctx.req?.headers.host
  return { initialLanguage, hostName }
}

export default MyApp
