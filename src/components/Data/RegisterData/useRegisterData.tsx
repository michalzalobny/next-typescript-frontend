import React from 'react'
import { useFlashContext } from '../../Context/FlashContext'
import { useLogerContext } from '../../Context/LogerContext'
import axios from '../../../utils/axiosInstance'
import useText from '../../Hooks/useText'
import { useServerResponse } from '../../Hooks/useServerResponse'

export const useRegisterData = () => {
  const { flashFailResponse } = useServerResponse()
  const getText = useText()
  const { addFlash } = useFlashContext()
  const { changeLogerMode } = useLogerContext()

  const infoRegistered = getText('infoRegistered')

  const registerDataHandler = React.useCallback(
    (email, password, name, setLoadingForm) => {
      axios
        .post('/user/register', { email, password, name })
        .then(() => {
          changeLogerMode('login')
          addFlash({ flashText: infoRegistered, flashType: 'info' })
        })
        .catch((error) => {
          setLoadingForm(false)
          flashFailResponse(error.response.data.message)
        })
    },
    [changeLogerMode, addFlash, infoRegistered, flashFailResponse]
  )
  return registerDataHandler
}
