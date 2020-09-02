import React from 'react'
import { useLogerContext } from '../../../Context/LogerContext'
import axios from '../../../utils/axiosInstance'
import { useUserCredentials } from '../../../Hooks/useUserCredentials'
import { useServerResponse } from '../../../Hooks/useServerResponse'

export const useLoginData = () => {
  const { flashFailResponse } = useServerResponse()

  const { toggleShowLoger } = useLogerContext()
  const assignCredentials = useUserCredentials()

  const loginDataHandler = React.useCallback(
    (username, password, setLoadingForm) => {
      axios
        .post('/users/auth/local', { username, password })
        .then((response) => {
          toggleShowLoger()
          localStorage.setItem('shouldRequestLogin', 'true')
          assignCredentials({ expiresIn: response.data.expiresIn, userRoles: response.data.roles })
        })
        .catch((error) => {
          setLoadingForm(false)
          flashFailResponse(error.response.data.message)
        })
    },
    [assignCredentials, flashFailResponse, toggleShowLoger]
  )
  return loginDataHandler
}
