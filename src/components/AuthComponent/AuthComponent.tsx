import React, { useEffect, useState } from 'react'
import { Loading } from './Loading'
import axios from '../../axiosInstance'
import { useFlashContext } from '../Context/FlashContext'
import { useAuthContext } from '../Context/AuthContext'
import useText from '../Hooks/useText'
import { useUserCredentials } from '../Hooks/useUserCredentials'

export const AuthComponent: React.FC = React.memo(({ children }) => {
  const { addFlash } = useFlashContext()
  const getText = useText()
  const { authLogoutAsync } = useAuthContext()
  const assignCredentials = useUserCredentials()
  const infoError = getText('infoError')

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const shouldRequestLogin = localStorage.getItem('shouldRequestLogin')
    if (shouldRequestLogin && !isReady) {
      axios
        .get('user/auth/credentials')
        .then((response) => {
          setIsReady(true)
          assignCredentials({ expiresIn: response.data.expiresIn, userRoles: response.data.roles })
        })
        .catch(() => {
          setIsReady(true)
          authLogoutAsync(false)
          addFlash({
            flashText: infoError,
            flashType: 'fail',
          })
        })
    } else {
      setIsReady(true)
    }
  }, [addFlash, assignCredentials, authLogoutAsync, infoError, isReady])

  if (!isReady) {
    return <Loading />
  }
  return <>{children}</>
})
