import React from 'react'
import Link from 'next/link'
import { useAuthFor } from '../Hooks/useAuthFor'
import useText from '../Hooks/useText'

const Footer = React.memo(() => {
  const getText = useText()
  const authFor = useAuthFor()

  return (
    <footer className="footer">
      <div className="container footer__container">
        <Link href="/privacy-policy">
          <a className="footer__item">{getText('privacyPolicy')}</a>
        </Link>
        <p className="footer__item footer__item__info">
          {getText('footerRights')}
          {new Date().getFullYear()}
        </p>
        {authFor(['superuser', 'admin']) ? (
          <Link href="/panel">
            <a className="footer__item">{getText('footerPanel')}</a>
          </Link>
        ) : null}
      </div>
    </footer>
  )
})

export default Footer
