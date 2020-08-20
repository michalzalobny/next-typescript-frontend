import { Language } from '../../types/sharedTypes'
import dictionary from './Dictionary.json'

type Props = {
  cookieLang: Language
  browserLang: string | undefined
}

const isLangAvailable = (lang: string | undefined) => {
  const langOptions = Object.keys(dictionary) as Array<keyof typeof dictionary>
  for (let i = 0; i < langOptions.length; i += 1) {
    if (langOptions[i] === lang) {
      return true
    }
  }
  return false
}

export const defineInitialLanguage = ({ cookieLang, browserLang }: Props) => {
  const cookieLangExists = isLangAvailable(cookieLang)
  const browserLangExists = isLangAvailable(browserLang)
  if (cookieLangExists) {
    return cookieLang as Language
  }
  if (browserLangExists) {
    return browserLang as Language
  }
  return Object.keys(dictionary)[0] as Language
}
