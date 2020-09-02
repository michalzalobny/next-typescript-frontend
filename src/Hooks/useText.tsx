import React from 'react'
import Dictionary from '../Language/Dictionary.json'
import { useLanguageContext } from '../Context/LanguageContext'

type Language = keyof typeof Dictionary

const useText = () => {
  const { language } = useLanguageContext()
  const translations = Dictionary as Record<Language, Record<string, string | undefined>>
  const getText = React.useCallback(
    (tid: string) => {
      const word = translations[language][tid]
      if (word) {
        return word
      }
      return `$\{${tid}}`
    },
    [language, translations]
  )
  return getText
}

export default useText
