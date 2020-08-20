import React from 'react'
import Link from 'next/link'
import useText from '../components/Hooks/useText'
import { SeoHead } from '../components/Seo/SeoHead'

const ErrorPage = React.memo(() => {
  const getText = useText()
  return (
    <>
      <SeoHead dontIndex metaDescription="" pageTitle={getText('errorMain')} />
      <div className="error__container__wrapper">
        <div className="error__container">
          <div className="container">
            <div className="error">
              <h4 className="error__info">{getText('errorMain')}</h4>
              <h2 className="error__code">{getText('errorCode')}</h2>
              <Link href="/">
                <a className="btn">{getText('errorBtn')}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default ErrorPage
