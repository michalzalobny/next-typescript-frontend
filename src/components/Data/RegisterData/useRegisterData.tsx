import React from 'react'
import { useFlashContext } from '../../Context/FlashContext'
import { useLogerContext } from '../../Context/LogerContext'
import axios from '../../../axiosInstance'
import useText from '../../Hooks/useText'

export const useRegisterData = () => {
  const getText = useText()
  const { addFlash } = useFlashContext()
  const { changeLogerMode } = useLogerContext()

  const infoError = getText('infoError')
  const infoRegistered = getText('infoRegistered')

  const registerDataHandler = React.useCallback(
    (email, password, name, setLoadingForm) => {
      axios
        .post('/user/register', { email, password, name })
        .then(() => {
          changeLogerMode('login')
          addFlash({ flashText: infoRegistered, flashType: 'info' })
        })
        .catch(() => {
          addFlash({ flashText: infoError, flashType: 'fail' })
          setLoadingForm(false)
        })
    },
    [changeLogerMode, addFlash, infoRegistered, infoError]
  )
  return registerDataHandler
}
