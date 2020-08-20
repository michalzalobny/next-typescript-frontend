import React, { useState } from 'react'
import Link from 'next/link'
import navImg from '../../public/siteImages/logo.svg'
import { LogerModeTypes } from '../../../types/sharedTypes'

import { useAuthContext } from '../Context/AuthContext'
import { useLogerContext } from '../Context/LogerContext'
import useText from '../Hooks/useText'

const Navbar = React.memo(() => {
  const getText = useText()
  const { userRoles, authLogoutAsync } = useAuthContext()
  const { changeLogerMode, toggleShowLoger } = useLogerContext()
  const [showNavbar, setShowNavbar] = useState(false)
  const [navbarTouched, setNavbarTouched] = useState(false)

  const clickedLinkHandler = React.useCallback(
    (mode: LogerModeTypes) => {
      if (!mode) {
        setShowNavbar(false)
      } else {
        changeLogerMode(mode)
        toggleShowLoger()
        setShowNavbar(false)
      }
    },
    [changeLogerMode, toggleShowLoger]
  )

  const toggleNavHandler = React.useCallback(() => {
    setShowNavbar(!showNavbar)
    if (!navbarTouched) {
      setNavbarTouched(true)
    }
  }, [showNavbar, navbarTouched])

  return (
    <nav className="navigation">
      <button
        aria-label={getText('labelToggleNavbar')}
        type="button"
        onClick={toggleNavHandler}
        className={`navigation__background ${showNavbar ? 'navigation__background__checked' : ''}`}
      />
      <div className="navigation__list">
        <span className="navigation__list__item__img">
          <Link href="/">
            <a tabIndex={0} role="button" className="navigation__list__item__img__link">
              <img src={navImg} className="navigation__list__item__img__icon" alt="site logo" />
            </a>
          </Link>
        </span>
        <span
          className={` navigation__list__container ${navbarTouched ? 'navigation__list__container__touched' : ''} ${
            showNavbar ? 'navigation__list__container__checked' : ''
          }`}
        >
          {/* <span className="navigation__list__item">
            <Link href="/">
              <a tabIndex={0} role="button" onClick={toggleNavHandler} className="navigation__list__item__link">Strona główna</a>
            </Link>
          </span> */}

          {userRoles.length === 0 ? (
            <span className="navigation__list__item">
              <button type="button" onClick={() => clickedLinkHandler('login')} className="navigation__list__item__link">
                {getText('login')}
              </button>
            </span>
          ) : null}

          {userRoles.length === 0 ? (
            <span className="navigation__list__item">
              <button type="button" onClick={() => clickedLinkHandler('register')} className="navigation__list__item__link">
                {getText('register')}
              </button>
            </span>
          ) : null}

          {userRoles.length !== 0 ? (
            <span className="navigation__list__item">
              <button
                type="button"
                onClick={() => {
                  authLogoutAsync(true)
                }}
                className="navigation__list__item__link"
              >
                {getText('logout')}
              </button>
            </span>
          ) : null}
        </span>
      </div>
      <button aria-label={getText('labelToggleNavbar')} type="button" onClick={() => toggleNavHandler()} className="stripes">
        <span className={`stripes__one ${showNavbar ? 'stripes__one__checked' : ''}`} />
        <span className={`stripes__two ${showNavbar ? 'stripes__two__checked' : ''}`} />
      </button>
    </nav>
  )
})

export default Navbar
