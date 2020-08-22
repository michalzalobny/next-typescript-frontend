import React from 'react'
import googleLogo from '../../../public/siteImages/google-logo.svg'
import useText from '../../Hooks/useText'

const GoogleLogin = React.memo(() => {
  const getText = useText()
  const loginHandler = React.useCallback(() => {
    localStorage.setItem('shouldRequestLogin', 'true')
  }, [])

  return (
    <div className="loger-alternatives--google">
      <img className="loger-alternatives--google__icon" src={googleLogo} alt="google icon" />
      <a
        aria-label="Login with Google"
        onClick={() => loginHandler()}
        className="loger-alternatives--google__link"
        href="/api/user/auth/google"
      >
        {getText('oAuthGoogle')}
      </a>
    </div>
  )
})

export default GoogleLogin
