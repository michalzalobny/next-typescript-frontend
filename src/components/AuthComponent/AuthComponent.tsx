import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Loading } from './Loading'
import axios from '../../utils/axiosInstance'
import { useAuthContext } from '../Context/AuthContext'
import { useUserCredentials } from '../Hooks/useUserCredentials'
import { useServerResponse } from '../Hooks/useServerResponse'

export const AuthComponent: React.FC = React.memo(({ children }) => {
  const { flashFailResponse } = useServerResponse()
  const router = useRouter()

  const { authLogoutAsync } = useAuthContext()
  const assignCredentials = useUserCredentials()

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const shouldRequestLogin = localStorage.getItem('shouldRequestLogin')
    if (shouldRequestLogin && !isReady) {
      axios
        .get('users/auth/credentials')
        .then((response) => {
          setIsReady(true)
          assignCredentials({ expiresIn: response.data.expiresIn, userRoles: response.data.roles })
        })
        .catch(() => {
          setIsReady(true)
          authLogoutAsync(false)
          flashFailResponse(router.query.message)
        })
    } else {
      setIsReady(true)
    }
  }, [assignCredentials, authLogoutAsync, isReady, router.query.message, flashFailResponse])

  if (!isReady) {
    return <Loading />
  }
  return <>{children}</>
})
