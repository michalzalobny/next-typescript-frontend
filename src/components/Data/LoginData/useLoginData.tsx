import React from 'react'
import { useFlashContext } from '../../Context/FlashContext'
import { useAuthContext } from '../../Context/AuthContext'
import { useLogerContext } from '../../Context/LogerContext'
import axios from '../../../axiosInstance'
import useText from '../../Hooks/useText'

export const useLoginData = () => {
  const getText = useText()
  const { addFlash } = useFlashContext()
  const { toggleShowLoger } = useLogerContext()
  const { defineAuthTimeout, authSuccess } = useAuthContext()

  const infoDifferentStrategy = getText('infoDifferentStrategy')
  const infoShouldRegister = getText('infoShouldRegister')
  const infoWrongData = getText('infoWrongData')
  const infoError = getText('infoError')

  const loginDataHandler = React.useCallback(
    (username, password, setLoadingForm) => {
      axios
        .post('/user/auth/local', { username, password })
        .then((response) => {
          toggleShowLoger()
          localStorage.setItem('loginStrategy', 'local')
          defineAuthTimeout(response.data.expiresIn)
          authSuccess(response.data.roles)
        })
        .catch((error) => {
          setLoadingForm(false)
          switch (error.response.data.action) {
            case 'shouldRegister':
              addFlash({ flashText: infoShouldRegister, flashType: 'info' })
              // changeLogerMode('register')
              break
            case 'differentStrategy':
              addFlash({ flashText: infoDifferentStrategy, flashType: 'info' })
              setLoadingForm(false)
              break
            case 'wrongPassword':
              addFlash({ flashText: infoWrongData, flashType: 'fail' })
              setLoadingForm(false)
              break
            default:
              addFlash({ flashText: infoError, flashType: 'fail' })
              setLoadingForm(false)
              break
          }
        })
    },
    [toggleShowLoger, defineAuthTimeout, authSuccess, addFlash, infoShouldRegister, infoDifferentStrategy, infoWrongData, infoError]
  )
  return loginDataHandler
}
