import React, { useState } from 'react'

type InputPropsParams = {
  type: 'email' | 'password' | 'text'
  min?: number
  isRequired: boolean
}

type InputFeatures = {
  focusLabel: boolean
  isValid: boolean
  shouldOffset: boolean
}

type InputValue = string | number

export const useInput = (initialValue: InputValue, params: InputPropsParams) => {
  const [value, setValue] = useState<InputValue>(initialValue)
  const [focusLabel, setfocusLabel] = useState<InputFeatures['focusLabel']>(false)
  const [isValid, setIsValid] = useState<InputFeatures['isValid']>(false)
  const [shouldOffset, setShouldOffset] = useState<InputFeatures['shouldOffset']>(false)

  const validateEmail = React.useCallback((email: string | number) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }, [])

  const validation = React.useCallback(
    (passedValue) => {
      switch (params.type) {
        case 'email':
          if (validateEmail(passedValue)) {
            setIsValid(true)
            setShouldOffset(false)
          } else {
            setShouldOffset(true)
            setIsValid(false)
          }
          break
        case 'password':
          if (params.min) {
            if (passedValue.length < params.min) {
              setIsValid(false)
              setShouldOffset(true)
            } else {
              setIsValid(true)
              setShouldOffset(false)
            }
          } else {
            throw new Error('Min length of string not passed.')
          }
          break
        case 'text':
          if (params.isRequired) {
            if (passedValue.length < 1) {
              setIsValid(false)
              setShouldOffset(true)
            } else {
              setIsValid(true)
              setShouldOffset(false)
            }
          } else {
            setIsValid(true)
          }

          break
        default:
          break
      }
    },
    [params.isRequired, params.min, params.type, validateEmail]
  )

  const resetInput = React.useCallback(() => {
    setValue('')
    setfocusLabel(false)
    setIsValid(false)
    setShouldOffset(false)
  }, [])

  const onChangeHandler = React.useCallback(
    (event) => {
      setValue(event.target.value)
      validation(event.target.value)
    },
    [validation]
  )

  const onBlurHandler = React.useCallback(() => {
    if (value === '') {
      setfocusLabel(false)
    } else {
      setfocusLabel(true)
    }
  }, [value])

  return {
    value,
    focusLabel,
    setValue,
    shouldOffset,
    isValid,
    // Trigger on client when nothing is passed and never touched
    changeShouldOffset: () => validation(''),
    reset: () => resetInput(),
    bind: {
      value,
      onFocus: () => {
        setfocusLabel(true)
      },
      onBlur: onBlurHandler,
      onChange: (event: React.ChangeEvent) => onChangeHandler(event),
    },
  }
}
