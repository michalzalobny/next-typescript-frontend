import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import cookieImg from '../../public/siteImages/cookies2.svg'
import useText from '../../Hooks/useText'

const CookieInfo = React.memo(() => {
  const [showCookieModal, setShowCookieModal] = useState(false)
  const getText = useText()
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookiesConsent')
    if (cookieConsent === null || undefined) {
      setShowCookieModal(true)
    }
  }, [])

  const cookiesAcceptHandler = React.useCallback(() => {
    localStorage.setItem('cookiesConsent', 'given')
    setShowCookieModal(false)
  }, [])

  if (showCookieModal) {
    return (
      <>
        <div className="cookie-box">
          <img className="cookie-box__img" src={cookieImg} alt="cookies" />
          <p className="cookie-box__text">
            {getText('cookies')}
            <Link href="/privacy-policy">
              <a className="cookie-box__text cookie-box__link"> {getText('privacyPolicy')}</a>
            </Link>
          </p>
          <div className="cookie-box__btn-container">
            <button
              type="button"
              aria-label={getText('labelCookieClose')}
              onClick={cookiesAcceptHandler}
              className="btn cookie-box__btn-container__btn"
            >
              {getText('cookiesOkay')}
            </button>
          </div>
        </div>
      </>
    )
  }
  return null
})

export default CookieInfo
