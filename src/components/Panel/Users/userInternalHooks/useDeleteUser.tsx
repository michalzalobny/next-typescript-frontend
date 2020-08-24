import React from 'react'
import { useFlashContext } from '../../../Context/FlashContext'
import axios from '../../../../utils/axiosInstance'
import useText from '../../../Hooks/useText'
import { RolesTypes, UserType } from '../../../../../types/sharedTypes'
import { useServerResponse } from '../../../Hooks/useServerResponse'

export const useDeleteUser = () => {
  const { flashFailResponse } = useServerResponse()
  const getText = useText()
  const { addFlash } = useFlashContext()
  const panelRemoveSuccess = getText('panelRemoveSuccess')
  const deleteUser = React.useCallback(
    (currentUser: UserType, toggleDeleteUserModal: () => void, fetchUsers: () => void) => {
      axios
        .delete(`/users/${currentUser._id}`)
        .then(() => {
          toggleDeleteUserModal()
          addFlash({
            flashText: panelRemoveSuccess,
            flashType: 'info',
          })
          fetchUsers()
        })
        .catch(() => {
          flashFailResponse(undefined)
        })
    },
    [addFlash, flashFailResponse, panelRemoveSuccess]
  )

  const openDeleteUserModal = React.useCallback(
    (
      user: UserType,
      setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>,
      toggleDeleteUserModal: () => void,
      setUserRolesArray: React.Dispatch<React.SetStateAction<RolesTypes[]>>
    ) => {
      toggleDeleteUserModal()
      setCurrentUser(user)
      setUserRolesArray(user.roles)
    },
    []
  )

  return {
    deleteUser,
    openDeleteUserModal,
  }
}
