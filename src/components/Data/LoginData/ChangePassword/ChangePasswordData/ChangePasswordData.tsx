import React, { useState } from 'react'
import { useInput } from '../../../../Hooks/useInput'
import { useChangePasswordData } from './useChangePasswordData'
import useText from '../../../../Hooks/useText'

const ChangePasswordData = React.memo(() => {
  const changePasswordDataHandler = useChangePasswordData()
  const getText = useText()
  const [loadingForm, setLoadingForm] = useState(false)

  const {
    value: valueFirst,
    bind: bindFirst,
    isValid: isValidFirst,
    focusLabel: focusLabelFirst,
    shouldOffset: shouldOffsetFirst,
    changeShouldOffset: changeShouldOffsetFirst,
  } = useInput('', { type: 'email', isRequired: true })

  const isFormValid = React.useCallback(() => {
    if (isValidFirst) {
      return true
    }
    return false
  }, [isValidFirst])

  const handleSend = React.useCallback(() => {
    // Offseting inputs if empty
    if (valueFirst === '') {
      changeShouldOffsetFirst()
    }
    if (isFormValid()) {
      setLoadingForm(true)
      const formData = {
        resetUserPasswordDataEmail: valueFirst,
      }
      changePasswordDataHandler(formData, setLoadingForm)
    }
  }, [changePasswordDataHandler, changeShouldOffsetFirst, isFormValid, valueFirst])

  return (
    <>
      <form>
        <div className="form__input__container">
          <div className="form__input__wrapper">
            <label htmlFor="changePassword" className={`form__label ${focusLabelFirst ? 'form__label__focused' : ''}`}>
              {getText('formEmail')}
            </label>
            <input
              id="changePassword"
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

        {loadingForm ? (
          <div className="btn btn__form btn btn__form__loading">
            {getText('formSendLoading')}
            <span className="btn__form__loader" />
          </div>
        ) : (
          <button aria-label={getText('sendEmailInfo')} type="button" onClick={handleSend} className="btn btn__form">
            {getText('sendEmailInfo')}
          </button>
        )}
      </form>
    </>
  )
})

export default ChangePasswordData
