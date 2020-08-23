import React from 'react'
import { useFlashContext } from '../../Context/FlashContext'
import axios from '../../../utils/axiosInstance'
import useText from '../../Hooks/useText'
import { useServerResponse } from '../../Hooks/useServerResponse'

export const usePageFormData = () => {
  const { flashFailResponse } = useServerResponse()
  const getText = useText()
  const { addFlash } = useFlashContext()

  const infoSent = getText('infoSent')
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
          flashFailResponse(undefined)
        })
    },
    [addFlash, flashFailResponse, infoSent, userInfo12, userInfo13]
  )
  return pageFormDataHandler
}
