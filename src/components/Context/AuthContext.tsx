import React, { createContext, useContext, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { RolesTypes } from '../../../types/sharedTypes'
import axios from '../../axiosInstance'
import { useFlashContext } from './FlashContext'
import useText from '../Hooks/useText'

type Props = {
  children: React.ReactNode
}

type AuthContextTypes = {
  userRoles: RolesTypes[]
  authLogoutAsync: (authLogoutAsync: boolean) => void
  defineAuthTimeout: (expiresIn: number) => void
  authSuccess: (roles: AuthContextTypes['userRoles']) => void
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined)

const AuthContextProvider = React.memo<Props>((props) => {
  const { children } = props
  const router = useRouter()
  const { addFlash } = useFlashContext()
  const [userRoles, setUserRoles] = useState<AuthContextTypes['userRoles']>([])
  const getText = useText()

  const infoError = getText('infoError')
  const infoLogged = getText('infoLogged')
  const infoLoggedOut = getText('infoLoggedOut')

  const authLogoutAsync = React.useCallback(
    (shouldAskServer: boolean) => {
      if (shouldAskServer) {
        axios
          .get('/user/logout')
          .then(() => {
            if (router.pathname !== '/') {
              Router.push('/')
            }
            localStorage.removeItem('loginStrategy')
            setUserRoles([])
            addFlash({
              flashText: infoLoggedOut,
              flashType: 'info',
            })
          })
          .catch(() => {
            addFlash({
              flashText: infoError,
              flashType: 'fail',
            })
          })
      } else {
        setUserRoles([])
        localStorage.removeItem('loginStrategy')
      }
    },
    [addFlash, infoError, infoLoggedOut, router.pathname]
  )

  const defineAuthTimeout = React.useCallback(
    (expiresIn: number) => {
      setTimeout(() => {
        authLogoutAsync(true)
      }, expiresIn)
    },
    [authLogoutAsync]
  )

  const authSuccess = React.useCallback(
    (roles: AuthContextTypes['userRoles']) => {
      setUserRoles(roles)
      addFlash({
        flashText: infoLogged,
        flashType: 'success',
      })
    },
    [addFlash, infoLogged]
  )

  return (
    <AuthContext.Provider
      value={{
        userRoles,
        authLogoutAsync,
        defineAuthTimeout,
        authSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
})
export default AuthContextProvider

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuthContext must be used within a FlashContextProvider')
  }
  return ctx
}
