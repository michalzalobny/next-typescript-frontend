import React from 'react'
import Router from 'next/router'
import { useFlashContext } from '../../../../../Context/FlashContext'
import axios from '../../../../../utils/axiosInstance'
import useText from '../../../../../Hooks/useText'
import { useServerResponse } from '../../../../../Hooks/useServerResponse'

export const useChangePasswordData = () => {
  const { flashFailResponse } = useServerResponse()
  const { addFlash } = useFlashContext()
  const getText = useText()
  const resetSent = getText('resetSent')

  const emailDataSubject = getText('emailDataSubject')
  const emailData1 = getText('emailData1')
  const emailData2 = getText('emailData2')
  const emailData3 = getText('emailData3')

  const useChangePasswordDataHandler = React.useCallback(
    (passedData, setLoadingForm) => {
      const payload = passedData

      payload.emailData1 = emailData1
      payload.emailData2 = emailData2
      payload.emailData3 = emailData3
      payload.emailDataSubject = emailDataSubject

      axios
        .post('/users/reset-password', payload)
        .then(() => {
          setLoadingForm(false)
          addFlash({ flashText: resetSent, flashType: 'info' })
          Router.push('/')
        })
        .catch(() => {
          setLoadingForm(false)
          flashFailResponse(undefined)
        })
    },
    [addFlash, emailData1, emailData2, emailData3, emailDataSubject, resetSent, flashFailResponse]
  )
  return useChangePasswordDataHandler
}
