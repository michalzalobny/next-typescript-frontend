import React, { useState } from 'react'
import Link from 'next/link'
import { useInput } from '../../Hooks/useInput'
import { useLoginData } from './useLoginData'

import { useLogerContext } from '../../Context/LogerContext'
import useText from '../../Hooks/useText'

const LoginData = React.memo(() => {
  const getText = useText()
  const loginDataHandler = useLoginData()
  const { toggleShowLoger } = useLogerContext()
  const [loadingForm, setLoadingForm] = useState(false)

  const {
    value: valueFirst,
    bind: bindFirst,
    isValid: isValidFirst,
    focusLabel: focusLabelFirst,
    shouldOffset: shouldOffsetFirst,
    changeShouldOffset: changeShouldOffsetFirst,
  } = useInput('', { type: 'email', isRequired: true })
  const {
    value: valueSecond,
    bind: bindSecond,
    isValid: isValidSecond,
    focusLabel: focusLabelSecond,
    shouldOffset: shouldOffsetSecond,
    changeShouldOffset: changeShouldOffsetSecond,
  } = useInput('', { type: 'password', min: 5, isRequired: true })

  const isFormValid = React.useCallback(() => {
    if (isValidFirst && isValidSecond) {
      return true
    }
    return false
  }, [isValidFirst, isValidSecond])

  const handleSend = React.useCallback(() => {
    // Offseting inputs if empty
    if (valueFirst === '') {
      changeShouldOffsetFirst()
    }
    if (valueSecond === '') {
      changeShouldOffsetSecond()
    }
    if (isFormValid()) {
      setLoadingForm(true)
      loginDataHandler(valueFirst, valueSecond, setLoadingForm)
    }
  }, [changeShouldOffsetFirst, changeShouldOffsetSecond, isFormValid, loginDataHandler, valueFirst, valueSecond])

  return (
    <>
      <form action="">
        <div className="form__input__container">
          <div className="form__input__wrapper">
            <label htmlFor="loginEmail" className={`form__label ${focusLabelFirst ? 'form__label__focused' : ''}`}>
              {getText('formEmail')}
            </label>
            <input
              id="loginEmail"
              autoComplete="email"
              value={bindFirst.value}
              onFocus={bindFirst.onFocus}
              onBlur={bindFirst.onBlur}
              onChange={bindFirst.onChange}
              type="text"
              className={`form__input ${shouldOffsetFirst ? 'form__input__invalid' : ''}`}
            />
          </div>
          {shouldOffsetFirst ? <p className="form__input__info">{getText('formEmailInfo')}</p> : null}
        </div>

        <div className="form__input__container">
          <div className="form__input__wrapper">
            <label htmlFor="loginPassword" className={`form__label ${focusLabelSecond ? 'form__label__focused' : ''}`}>
              {getText('formPassword')}
            </label>
            <input
              id="loginPassword"
              autoComplete="off"
              value={bindSecond.value}
              onFocus={bindSecond.onFocus}
              onBlur={bindSecond.onBlur}
              onChange={bindSecond.onChange}
              type="password"
              className={`form__input ${shouldOffsetSecond ? 'form__input__invalid' : ''}`}
            />
          </div>
          <Link href="/user/reset/password">
            <button
              aria-label={getText('labelForgotPassowrd')}
              type="button"
              onClick={() => toggleShowLoger()}
              className="form__input__message"
            >
              {getText('formPasswordForgot')}
            </button>
          </Link>
          {shouldOffsetSecond ? <p className="form__input__info">{getText('formPasswordInfo')}</p> : null}
        </div>

        {loadingForm ? (
          <div className="btn btn__form btn btn__form__loading">
            {getText('formLoginLoading')}
            <span className="btn__form__loader" />
          </div>
        ) : (
          <button aria-label={getText('formLogin')} type="button" onClick={handleSend} className="btn btn__form">
            {getText('formLogin')}
          </button>
        )}
      </form>
    </>
  )
})

export default LoginData
