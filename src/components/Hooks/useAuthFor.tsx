import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { RolesTypes } from '../../../types/sharedTypes'

export const useAuthFor = () => {
  const { userRoles } = useAuthContext()

  const authFor = React.useCallback(
    (roles: RolesTypes[]) => {
      return roles.some((userRole) => userRoles.includes(userRole))
    },
    [userRoles]
  )
  return authFor
}
