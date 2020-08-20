import React from 'react'
import Router from 'next/router'
import { useFlashContext } from '../../../../Context/FlashContext'
import axios from '../../../../../axiosInstance'
import useText from '../../../../Hooks/useText'

export const useChangePasswordCallbackData = () => {
  const { addFlash } = useFlashContext()
  const getText = useText()
  const passwordChanged = getText('passwordChanged')
  const infoError = getText('infoError')

  const changePasswordCallbackDataHandler = React.useCallback(
    (passedData, setLoadingForm) => {
      const token = window.location.pathname.split('/')[4]
      axios
        .post(`/user/resetuseremailpassword/${token}`, passedData)
        .then(() => {
          setLoadingForm(false)
          addFlash({ flashText: passwordChanged, flashType: 'success' })
          Router.push('/')
        })
        .catch(() => {
          setLoadingForm(false)
          addFlash({ flashText: infoError, flashType: 'fail' })
        })
    },
    [addFlash, infoError, passwordChanged]
  )
  return changePasswordCallbackDataHandler
}
