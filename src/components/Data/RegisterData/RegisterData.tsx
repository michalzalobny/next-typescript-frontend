import React, { useState } from 'react'
import { useInput } from '../../../Hooks/useInput'

import { useRegisterData } from './useRegisterData'
import useText from '../../../Hooks/useText'

const RegisterData = React.memo(() => {
  const registerDataHandler = useRegisterData()
  const getText = useText()
  const [loadingForm, setLoadingForm] = useState(false)
  // Email
  const {
    value: valueFirst,
    bind: bindFirst,
    isValid: isValidFirst,
    focusLabel: focusLabelFirst,
    shouldOffset: shouldOffsetFirst,
    changeShouldOffset: changeShouldOffsetFirst,
  } = useInput('', { type: 'email', isRequired: true })
  // Password
  const {
    value: valueSecond,
    bind: bindSecond,
    isValid: isValidSecond,
    focusLabel: focusLabelSecond,
    shouldOffset: shouldOffsetSecond,
    changeShouldOffset: changeShouldOffsetSecond,
  } = useInput('', { type: 'password', min: 5, isRequired: true })
  // Name
  const {
    value: valueThird,
    bind: bindThird,
    isValid: isValidThird,
    focusLabel: focusLabelThird,
    shouldOffset: shouldOffsetThird,
    changeShouldOffset: changeShouldOffsetThird,
  } = useInput('', { type: 'text', isRequired: true })

  const isFormValid = React.useCallback(() => {
    if (isValidFirst && isValidSecond && isValidThird) {
      return true
    }
    return false
  }, [isValidFirst, isValidSecond, isValidThird])

  const handleSend = React.useCallback(() => {
    // Offseting inputs if empty
    if (valueFirst === '') {
      changeShouldOffsetFirst()
    }
    if (valueSecond === '') {
      changeShouldOffsetSecond()
    }
    if (valueThird === '') {
      changeShouldOffsetThird()
    }
    if (isFormValid()) {
      setLoadingForm(true)
      // const formData={
      //   registerDataEmail:valueFirst,
      //   registerDataPassword:valueSecond,
      //   registerDataName:valueThird
      // }
      registerDataHandler(valueFirst, valueSecond, valueThird, setLoadingForm)
    }
  }, [
    changeShouldOffsetFirst,
    changeShouldOffsetSecond,
    changeShouldOffsetThird,
    isFormValid,
    registerDataHandler,
    valueFirst,
    valueSecond,
    valueThird,
  ])

  return (
    <>
      <form>
        <div className="form__input__container">
          <div className="form__input__wrapper">
            <label htmlFor="registerName" className={`form__label ${focusLabelThird ? 'form__label__focused' : ''}`}>
              {getText('formName')}
            </label>
            <input
              id="registerName"
              autoComplete="name"
              value={bindThird.value}
              onFocus={bindThird.onFocus}
              onBlur={bindThird.onBlur}
              onChange={bindThird.onChange}
              type="text"
              className={`form__input ${shouldOffsetThird ? 'form__input__invalid' : ''}`}
            />
          </div>
          {shouldOffsetThird ? <p className="form__input__info">{getText('formNameInfo')}</p> : null}
        </div>

        <div className="form__input__container">
          <div className="form__input__wrapper">
            <label htmlFor="registerEmail" className={`form__label ${focusLabelFirst ? 'form__label__focused' : ''}`}>
              {getText('formEmail')}
            </label>
            <input
              id="registerEmail"
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
            <label htmlFor="registerPassword" className={`form__label ${focusLabelSecond ? 'form__label__focused' : ''}`}>
              {getText('formPassword')}
            </label>
            <input
              id="registerPassword"
              autoComplete="off"
              value={bindSecond.value}
              onFocus={bindSecond.onFocus}
              onBlur={bindSecond.onBlur}
              onChange={bindSecond.onChange}
              type="password"
              className={`form__input ${shouldOffsetSecond ? 'form__input__invalid' : ''}`}
            />
          </div>
          {shouldOffsetSecond ? <p className="form__input__info">{getText('formPasswordInfo')}</p> : null}
        </div>

        {loadingForm ? (
          <div className="btn btn__form btn btn__form__loading">
            {getText('formRegisterLoading')} <span className="btn__form__loader" />
          </div>
        ) : (
          <button aria-label={getText('formRegister')} type="button" onClick={handleSend} className="btn btn__form">
            {getText('formRegister')}
          </button>
        )}
      </form>
    </>
  )
})

export default RegisterData
