import React, { useEffect, useState } from 'react'
import { Loading } from './Loading'
import axios from '../../axiosInstance'
import { useFlashContext } from '../Context/FlashContext'
import { useAuthContext } from '../Context/AuthContext'
import useText from '../Hooks/useText'

export const AuthComponent: React.FC = React.memo(({ children }) => {
  const { addFlash } = useFlashContext()
  const getText = useText()
  const { authLogoutAsync, defineAuthTimeout, authSuccess } = useAuthContext()

  const infoError = getText('infoError')

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const loginStrategy = localStorage.getItem('loginStrategy')
    if (loginStrategy !== null) {
      axios
        .get('user/auth/credentials')
        .then((response) => {
          setIsReady(true)
          // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn)
          defineAuthTimeout(response.data.expiresIn)
          authSuccess(response.data.roles)
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
  }, [addFlash, authLogoutAsync, authSuccess, defineAuthTimeout, infoError])

  if (!isReady) {
    return <Loading />
  }
  return <>{children}</>
})
