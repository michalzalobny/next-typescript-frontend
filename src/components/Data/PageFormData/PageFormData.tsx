import React, { useState } from 'react'
import { useInput } from '../../Hooks/useInput'
import { usePageFormData } from './usePageFormData'
import useText from '../../Hooks/useText'

const PageFormData = React.memo(() => {
  const pageFormDataHandler = usePageFormData()
  const getText = useText()
  const [loadingForm, setLoadingForm] = useState(false)
  // Email
  const {
    value: valueFirst,
    bind: bindFirst,
    isValid: isValidFirst,
    reset: resetFirst,
    focusLabel: focusLabelFirst,
    shouldOffset: shouldOffsetFirst,
    changeShouldOffset: changeShouldOffsetFirst,
  } = useInput('', { type: 'email', isRequired: true })
  // Textarea
  const {
    value: valueSecond,
    bind: bindSecond,
    isValid: isValidSecond,
    reset: resetSecond,
    focusLabel: focusLabelSecond,
    shouldOffset: shouldOffsetSecond,
    changeShouldOffset: changeShouldOffsetSecond,
  } = useInput('', { type: 'text', isRequired: true })
  // Name
  const {
    value: valueThird,
    bind: bindThird,
    isValid: isValidThird,
    reset: resetThird,
    focusLabel: focusLabelThird,
    shouldOffset: shouldOffsetThird,
    changeShouldOffset: changeShouldOffsetThird,
  } = useInput('', { type: 'text', isRequired: false })

  const isFormValid = React.useCallback(() => {
    if (isValidFirst && isValidSecond && isValidThird) {
      return true
    }
    return false
  }, [isValidFirst, isValidSecond, isValidThird])

  const resetInputs = React.useCallback(() => {
    resetFirst()
    resetSecond()
    resetThird()
  }, [resetFirst, resetSecond, resetThird])

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
      const formData = {
        PageFormDataName: valueThird,
        PageFormDataEmail: valueFirst,
        PageFormDataContent: valueSecond,
      }
      pageFormDataHandler(formData, setLoadingForm, resetInputs)
    }
  }, [
    changeShouldOffsetFirst,
    changeShouldOffsetSecond,
    changeShouldOffsetThird,
    isFormValid,
    pageFormDataHandler,
    resetInputs,
    valueFirst,
    valueSecond,
    valueThird,
  ])

  return (
    <>
      <form>
        <div className="form__input__container">
          <div className="form__input__wrapper">
            <label htmlFor="pageFormName" className={`form__label ${focusLabelThird ? 'form__label__focused' : ''}`}>
              {getText('formName')}
            </label>
            <input
              id="pageFormName"
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
            <label htmlFor="pageFormEmail" className={`form__label ${focusLabelFirst ? 'form__label__focused' : ''}`}>
              {getText('formEmail')}
            </label>
            <input
              id="pageFormEmail"
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
            <label
              htmlFor="pageFormText"
              className={`form__input__textarea__label ${focusLabelSecond ? 'form__input__textarea__label__focused' : ''}`}
            >
              {getText('formText')}
            </label>
            <textarea
              id="pageFormText"
              autoComplete="off"
              value={bindSecond.value}
              onFocus={bindSecond.onFocus}
              onBlur={bindSecond.onBlur}
              onChange={bindSecond.onChange}
              className={`form__input__textarea ${shouldOffsetSecond ? 'form__input__textarea__invalid' : ''}`}
              rows={5}
            />
          </div>
          {shouldOffsetSecond ? <p className="form__input__info">{getText('formTextInfo')}</p> : null}
        </div>

        {loadingForm ? (
          <div className="btn btn__form btn btn__form__loading">
            {getText('formSendLoading')}
            <span className="btn__form__loader" />
          </div>
        ) : (
          <button type="button" onClick={handleSend} className="btn btn__form">
            {getText('formSend')}
          </button>
        )}
      </form>
    </>
  )
})

export default PageFormData
