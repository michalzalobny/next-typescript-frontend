import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import type { RolesTypes } from '../../../types/sharedTypes'

type AssignUserCredentialsType = {
  expiresIn: number
  userRoles: RolesTypes[]
}

export const useUserCredentials = () => {
  const { defineAuthTimeout, authSuccess } = useAuthContext()

  const assignCredentials = React.useCallback(
    ({ expiresIn, userRoles }: AssignUserCredentialsType) => {
      defineAuthTimeout(expiresIn)
      authSuccess(userRoles)
    },
    [authSuccess, defineAuthTimeout]
  )
  return assignCredentials
}
