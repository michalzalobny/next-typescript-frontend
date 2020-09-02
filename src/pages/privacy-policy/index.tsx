import React from 'react'
import Link from 'next/link'
import useText from '../../Hooks/useText'
import { SeoHead } from '../../components/Seo/SeoHead'

const PrivacyPolicyPage = React.memo(() => {
  const getText = useText()
  return (
    <>
      <SeoHead pageTitle={getText('privacyPolicy')} metaDescription="" />
      <div className="spacer" />
      <div className="container">
        <h3 className="universal-title">
          {getText('privacyPolicy')}
          <span className="universal-title--dot">.</span>
        </h3>
      </div>
      <div className="spacer" />
      <div className="container privacy__container">
        <h3 className="privacy-header">{getText('privacyHeader')}</h3>
        <p className="privacy__text">{getText('privacyText')}</p>
      </div>
      <div className="spacer" />
      <div className="privacy__link-container container">
        <Link href="/">
          <a className="btn">{getText('takeToMain')}</a>
        </Link>
      </div>
      <div className="spacer" />
    </>
  )
})

export default PrivacyPolicyPage
