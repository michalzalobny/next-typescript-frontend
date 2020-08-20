import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import { RolesTypes } from '../../../types/sharedTypes'

export const useCheckAuthRole = () => {
  const { userRoles } = useAuthContext()

  const authFor = React.useCallback(
    (roles: RolesTypes[]) => {
      let shouldAuth = false
      const userRolesArray = [...userRoles]
      userRolesArray.forEach((role) => {
        if (roles.includes(role)) {
          shouldAuth = true
        }
      })
      return shouldAuth
    },
    [userRoles]
  )
  return authFor
}
