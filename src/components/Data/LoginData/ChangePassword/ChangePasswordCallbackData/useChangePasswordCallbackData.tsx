import React from 'react'
import Router from 'next/router'
import { useFlashContext } from '../../../../../Context/FlashContext'
import axios from '../../../../../utils/axiosInstance'
import useText from '../../../../../Hooks/useText'
import { useServerResponse } from '../../../../../Hooks/useServerResponse'

export const useChangePasswordCallbackData = () => {
  const { flashFailResponse } = useServerResponse()
  const { addFlash } = useFlashContext()
  const getText = useText()
  const passwordChanged = getText('passwordChanged')

  const changePasswordCallbackDataHandler = React.useCallback(
    (passedData, setLoadingForm) => {
      const token = window.location.pathname.split('/')[4]
      axios
        .post(`/users/reset-password/${token}`, passedData)
        .then(() => {
          setLoadingForm(false)
          addFlash({ flashText: passwordChanged, flashType: 'success' })
          Router.push('/')
        })
        .catch(() => {
          setLoadingForm(false)
          flashFailResponse(undefined)
        })
    },
    [addFlash, flashFailResponse, passwordChanged]
  )
  return changePasswordCallbackDataHandler
}
