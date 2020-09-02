import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { Language } from '../../types/sharedTypes'

type Props = {
  children: React.ReactNode
  initialLanguage: Language
}

type LanguageContextTypes = {
  language: Language
  changeLanguage: (newLanguage: LanguageContextTypes['language']) => void
}

const LanguageContext = createContext<LanguageContextTypes | undefined>(undefined)

const LanguageContextProvider = React.memo<Props>((props) => {
  const { initialLanguage, children } = props
  const cookies = new Cookies()
  const [language, setLanguage] = useState<LanguageContextTypes['language']>(initialLanguage)

  const changeLanguage = React.useCallback(
    (newLanguage: LanguageContextTypes['language']) => {
      setLanguage(newLanguage)
      cookies.set('cookie-lang', newLanguage, { maxAge: 2147483647 })
      window.document.documentElement.lang = newLanguage
    },
    [cookies]
  )

  useEffect(() => {
    changeLanguage(initialLanguage)
  }, [changeLanguage, initialLanguage])

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>
})
export default LanguageContextProvider

export const useLanguageContext = () => {
  const ctx = useContext(LanguageContext)
  if (ctx === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageuseLanguageContextProvider')
  }
  return ctx
}
