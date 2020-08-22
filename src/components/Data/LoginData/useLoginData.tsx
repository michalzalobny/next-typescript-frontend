import React from 'react'
import { useFlashContext } from '../../Context/FlashContext'
import { useLogerContext } from '../../Context/LogerContext'
import axios from '../../../axiosInstance'
import useText from '../../Hooks/useText'
import { useUserCredentials } from '../../Hooks/useUserCredentials'

export const useLoginData = () => {
  const getText = useText()
  const { addFlash } = useFlashContext()
  const { toggleShowLoger } = useLogerContext()
  const assignCredentials = useUserCredentials()

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
          localStorage.setItem('shouldRequestLogin', 'true')
          assignCredentials({ expiresIn: response.data.expiresIn, userRoles: response.data.roles })
        })
        .catch((error) => {
          setLoadingForm(false)
          switch (error.response.data.action) {
            case 'shouldRegister':
              addFlash({ flashText: infoShouldRegister, flashType: 'info' })
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
    [addFlash, assignCredentials, infoDifferentStrategy, infoError, infoShouldRegister, infoWrongData, toggleShowLoger]
  )
  return loginDataHandler
}
