import React from 'react'
import { useFlashContext } from '../../../Context/FlashContext'
import axios from '../../../../axiosInstance'
import useText from '../../../Hooks/useText'
import { RolesTypes, UserType } from '../../../../../types/sharedTypes'

export const useDeleteUser = () => {
  const getText = useText()
  const { addFlash } = useFlashContext()
  const infoError = getText('infoError')
  const panelRemoveSuccess = getText('panelRemoveSuccess')
  const deleteUser = React.useCallback(
    (currentUser: UserType, toggleDeleteUserModal: () => void, fetchUsers: () => void) => {
      axios
        .delete(`/user/deleteuser/${currentUser._id}`)
        .then(() => {
          toggleDeleteUserModal()
          addFlash({
            flashText: panelRemoveSuccess,
            flashType: 'info',
          })
          fetchUsers()
        })
        .catch(() => {
          addFlash({
            flashText: infoError,
            flashType: 'fail',
          })
        })
    },
    [addFlash, infoError, panelRemoveSuccess]
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
