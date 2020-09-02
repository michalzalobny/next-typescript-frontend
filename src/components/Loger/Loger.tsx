import React from 'react'
import UniversalModal from '../Modals/UniversalModal'
import { useLogerContext } from '../../Context/LogerContext'
import GoogleLogin from '../OAuth/GoogleLogin/GoogleLogin'
import FacebookLogin from '../OAuth/FacebookLogin/FacebookLogin'
import LoginData from '../Data/LoginData/LoginData'
import RegisterData from '../Data/RegisterData/RegisterData'
import useText from '../../Hooks/useText'

const Loger = React.memo(() => {
  const getText = useText()
  const { logerMode, changeLogerMode, showLoger, toggleShowLoger } = useLogerContext()
  return (
    <UniversalModal isVisible={showLoger} toggle={toggleShowLoger}>
      <div className="loger-container">
        <button
          aria-label={getText('labelLogerSwitchToLogin')}
          type="button"
          onClick={() => changeLogerMode('login')}
          className={`loger-container__item ${logerMode === 'login' ? 'loger-container__item--current' : ''}`}
        >
          {getText('logerLogin')}
        </button>
        <button
          aria-label={getText('labelLogerSwitchToRegister')}
          type="button"
          onClick={() => changeLogerMode('register')}
          className={`loger-container__item ${logerMode === 'register' ? 'loger-container__item--current' : ''}`}
        >
          {getText('logerRegister')}
        </button>
        <div style={{ left: `${logerMode === 'login' ? '0' : '50%'}` }} className="loger-container__stripe" />
      </div>
      <div className="loger-alternatives">
        <GoogleLogin />
        <FacebookLogin />
        <div className="loger-alternatives__stripe">
          <p className="loger-alternatives__stripe__text">{getText('logerOr')}</p>
        </div>
      </div>

      {logerMode === 'login' ? <LoginData /> : <RegisterData />}
    </UniversalModal>
  )
})
export default Loger
