import React from 'react'
import fbLogo from '../../../public/siteImages/fb-logo.svg'
import useText from '../../Hooks/useText'

const FacebookLogin = React.memo(() => {
  const getText = useText()
  const loginHandler = React.useCallback(() => {
    localStorage.setItem('shouldRequestLogin', 'true')
  }, [])

  return (
    <div className="loger-alternatives--fb">
      <img className="loger-alternatives--fb__icon" src={fbLogo} alt="facebook icon" />
      <a
        aria-label="Login with Facebook"
        onClick={() => loginHandler()}
        className="loger-alternatives--fb__link"
        href="/api/user/auth/facebook"
      >
        {getText('oAuthFacebook')}
      </a>
    </div>
  )
})

export default FacebookLogin
