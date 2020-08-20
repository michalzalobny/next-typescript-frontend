import React from 'react'
import { useFlashContext } from '../../Context/FlashContext'
import axios from '../../../axiosInstance'
import useText from '../../Hooks/useText'

export const usePageFormData = () => {
  const getText = useText()
  const { addFlash } = useFlashContext()

  const infoSent = getText('infoSent')
  const infoError = getText('infoError')
  const userInfo12 = getText('userInfo12')
  const userInfo13 = getText('userInfo13')

  const pageFormDataHandler = React.useCallback(
    (passedData, setLoadingForm, resetInputs) => {
      const payload = passedData
      payload.userInfo12 = userInfo12
      payload.userInfo13 = userInfo13
      axios
        .post('/pageform/postpageform', payload)
        .then(() => {
          resetInputs()
          setLoadingForm(false)
          addFlash({ flashText: infoSent, flashType: 'info' })
        })
        .catch(() => {
          setLoadingForm(false)
          addFlash({ flashText: infoError, flashType: 'fail' })
        })
    },
    [addFlash, infoError, infoSent, userInfo12, userInfo13]
  )
  return pageFormDataHandler
}
