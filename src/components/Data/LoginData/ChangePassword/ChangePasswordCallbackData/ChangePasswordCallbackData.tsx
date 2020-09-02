import React, { useState } from 'react'
import { useInput } from '../../../../../Hooks/useInput'
import { useChangePasswordCallbackData } from './useChangePasswordCallbackData'
import useText from '../../../../../Hooks/useText'

const ChangePasswordCallbackData = React.memo(() => {
  const changePasswordCallbackDataHandler = useChangePasswordCallbackData()
  const getText = useText()
  const [loadingForm, setLoadingForm] = useState(false)

  const {
    value: valueFirst,
    bind: bindFirst,
    isValid: isValidFirst,
    focusLabel: focusLabelFirst,
    shouldOffset: shouldOffsetFirst,
    changeShouldOffset: changeShouldOffsetFirst,
  } = useInput('', { type: 'password', min: 5, isRequired: true })

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
        resetUserEmailPasswordDataPassword: valueFirst,
      }
      changePasswordCallbackDataHandler(formData, setLoadingForm)
    }
  }, [changePasswordCallbackDataHandler, changeShouldOffsetFirst, isFormValid, valueFirst])

  return (
    <>
      <form>
        <div className="form__input__container">
          <div className="form__input__wrapper">
            <label htmlFor="changePasswordCallback" className={`form__label ${focusLabelFirst ? 'form__label__focused' : ''}`}>
              {getText('newPassword')}
            </label>
            <input
              id="changePasswordCallback"
              autoComplete="off"
              value={bindFirst.value}
              onFocus={bindFirst.onFocus}
              onBlur={bindFirst.onBlur}
              onChange={bindFirst.onChange}
              type="password"
              className={`form__input ${shouldOffsetFirst ? 'form__input__invalid' : ''}`}
            />
          </div>
          {shouldOffsetFirst ? <p className="form__input__info">{getText('formPasswordInfo')}</p> : null}
        </div>

        {loadingForm ? (
          <div className="btn btn__form btn btn__form__loading">
            {getText('newPasswordSaveLoading')}
            <span className="btn__form__loader" />
          </div>
        ) : (
          <button aria-label={getText('newPasswordSave')} type="button" onClick={handleSend} className="btn btn__form">
            {getText('newPasswordSave')}
          </button>
        )}
      </form>
    </>
  )
})

export default ChangePasswordCallbackData
