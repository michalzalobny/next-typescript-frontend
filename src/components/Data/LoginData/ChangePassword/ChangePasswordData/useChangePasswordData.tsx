import React from 'react'
import Router from 'next/router'
import { useFlashContext } from '../../../../Context/FlashContext'
import axios from '../../../../../axiosInstance'
import useText from '../../../../Hooks/useText'

export const useChangePasswordData = () => {
  const { addFlash } = useFlashContext()
  const getText = useText()
  const resetSent = getText('resetSent')
  const infoError = getText('infoError')

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
        .post('/user/resetuserpassword', payload)
        .then(() => {
          setLoadingForm(false)
          addFlash({ flashText: resetSent, flashType: 'info' })
          Router.push('/')
        })
        .catch(() => {
          setLoadingForm(false)
          addFlash({ flashText: infoError, flashType: 'fail' })
        })
    },
    [addFlash, emailData1, emailData2, emailData3, emailDataSubject, infoError, resetSent]
  )
  return useChangePasswordDataHandler
}
