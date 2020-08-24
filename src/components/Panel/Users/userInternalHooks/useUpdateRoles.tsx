import React from 'react'
import { useFlashContext } from '../../../Context/FlashContext'
import axios from '../../../../utils/axiosInstance'
import useText from '../../../Hooks/useText'
import { RolesTypes, UserType } from '../../../../../types/sharedTypes'
import { useServerResponse } from '../../../Hooks/useServerResponse'

export const useUpdateRoles = () => {
  const { flashFailResponse } = useServerResponse()
  const getText = useText()
  const { addFlash } = useFlashContext()
  const infoPermissionSuccess = getText('infoPermissionSuccess')
  const updateRoles = React.useCallback(
    (currentUser: UserType, userPermissionsArray: RolesTypes[], fetchUsers: () => void, toggleUpdateRolesModal: () => void) => {
      axios
        .put(`/users/${currentUser._id}`, userPermissionsArray)
        .then(() => {
          toggleUpdateRolesModal()
          fetchUsers()
          addFlash({
            flashText: infoPermissionSuccess,
            flashType: 'info',
          })
        })
        .catch(() => {
          flashFailResponse(undefined)
        })
    },
    [addFlash, flashFailResponse, infoPermissionSuccess]
  )

  const openUpdateRolesModal = React.useCallback(
    (
      user: UserType,
      setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>,
      toggleUpdateRolesModal: () => void,
      setUserRolesArray: React.Dispatch<React.SetStateAction<RolesTypes[]>>
    ) => {
      toggleUpdateRolesModal()
      setCurrentUser(user)
      setUserRolesArray(user.roles)
    },
    []
  )

  const excludeRoleHandler = React.useCallback(
    (role: RolesTypes, userRolesArray: RolesTypes[], setUserRolesArray: React.Dispatch<React.SetStateAction<RolesTypes[]>>) => {
      const newUserPermissionArray = [...userRolesArray].filter((p) => p !== role)
      setUserRolesArray(newUserPermissionArray)
    },
    []
  )

  const includeRoleHandler = React.useCallback(
    (role: RolesTypes, userRolesArray: RolesTypes[], setUserRolesArray: React.Dispatch<React.SetStateAction<RolesTypes[]>>) => {
      const newUserPermissionArray = [...userRolesArray].concat(role)
      setUserRolesArray(newUserPermissionArray)
    },
    []
  )

  return {
    updateRoles,
    openUpdateRolesModal,
    excludeRoleHandler,
    includeRoleHandler,
  }
}
