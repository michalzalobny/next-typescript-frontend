import React from 'react'
import ChangePasswordData from '../../../../components/Data/LoginData/ChangePassword/ChangePasswordData/ChangePasswordData'
import useText from '../../../../components/Hooks/useText'
import { SeoHead } from '../../../../components/Seo/SeoHead'

const ResetPasswordPage = React.memo(() => {
  const getText = useText()
  return (
    <>
      <SeoHead metaDescription="" dontIndex pageTitle={getText('titlePasswordChange')} />
      <div className="spacer" />
      <div className="container">
        <h3 className="universal-title universal-title--center">
          {getText('titlePasswordChange')}
          <span className="universal-title--dot">.</span>
        </h3>
      </div>
      <div className="container">
        <div className="container">
          <ChangePasswordData />
        </div>
      </div>
    </>
  )
})

export default ResetPasswordPage
