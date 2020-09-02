import React from 'react'
import ChangePasswordCallbackData from '../../../../components/Data/LoginData/ChangePassword/ChangePasswordCallbackData/ChangePasswordCallbackData'
import useText from '../../../../Hooks/useText'
import { SeoHead } from '../../../../components/Seo/SeoHead'

const ResetPasswordPageId = React.memo(() => {
  const getText = useText()
  return (
    <>
      <SeoHead pageTitle={getText('newPasswordTitle')} metaDescription="" dontIndex />
      <div className="spacer" />
      <div className="container">
        <h3 className="universal-title universal-title--center">
          {getText('newPasswordTitle')}
          <span className="universal-title--dot">.</span>
        </h3>
      </div>

      <div className="container">
        <div className="container">
          <ChangePasswordCallbackData />
        </div>
      </div>
    </>
  )
})

export default ResetPasswordPageId
