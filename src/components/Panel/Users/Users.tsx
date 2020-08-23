import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import UniversalModal from '../../Modals/UniversalModal'
import useText from '../../Hooks/useText'
import { RolesTypes, UserType } from '../../../../types/sharedTypes'
import useModal from '../../Hooks/useModal'
import { useFetchUsers } from './userInternalHooks/useFetchUsers'
import { useUpdateRoles } from './userInternalHooks/useUpdateRoles'
import { useDeleteUser } from './userInternalHooks/useDeleteUser'

const Users = React.memo(() => {
  const getText = useText()

  const { show: showUpdateRolesModal, toggle: toggleUpdateRolesModal } = useModal()
  const { show: showDeleteUserModal, toggle: toggleDeleteUserModal } = useModal()

  const [loadingUsers, setLoadingUsers] = useState<boolean>(true)
  const [users, setUsers] = useState<UserType[]>([])
  const [userRolesArray, setUserRolesArray] = useState<RolesTypes[]>([])
  const [currentUser, setCurrentUser] = useState<UserType>({ _id: undefined, email: undefined, roles: [], name: undefined })

  const { fetchUsers } = useFetchUsers(setUsers, setLoadingUsers)
  const { updateRoles, openUpdateRolesModal, excludeRoleHandler, includeRoleHandler } = useUpdateRoles()
  const { deleteUser, openDeleteUserModal } = useDeleteUser()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const renderUsers = React.useCallback(() => {
    return users.map((user) => {
      return (
        <div key={user._id} className="panel-container__item">
          <div className="panel-container__item__left">
            <div className="panel-container__item__left__item">{user.email}</div>
          </div>
          <div className="panel-container__item__right">
            <button
              type="button"
              onClick={() => openDeleteUserModal(user, setCurrentUser, toggleDeleteUserModal, setUserRolesArray)}
              className="panel-container__item__right__control panel-container__item__right__control--red"
            >
              {getText('panelRemove')}
            </button>
            <button
              type="button"
              onClick={() => openUpdateRolesModal(user, setCurrentUser, toggleUpdateRolesModal, setUserRolesArray)}
              className="panel-container__item__right__control panel-container__item__right__control--green"
            >
              {getText('panelPermissions')}
            </button>
          </div>
        </div>
      )
    })
  }, [getText, openDeleteUserModal, openUpdateRolesModal, toggleDeleteUserModal, toggleUpdateRolesModal, users])

  const renderRoles = React.useCallback(() => {
    const grantForArray: RolesTypes[] = ['admin', 'superuser']
    return grantForArray.map((role) => {
      if (userRolesArray.includes(role)) {
        return (
          <button
            type="button"
            onClick={() => excludeRoleHandler(role, userRolesArray, setUserRolesArray)}
            key={shortid.generate()}
            className="panel-permission panel-permission--includes"
          >
            {role}
          </button>
        )
      }
      return (
        <button
          type="button"
          onClick={() => includeRoleHandler(role, userRolesArray, setUserRolesArray)}
          key={shortid.generate()}
          className="panel-permission"
        >
          {role}
        </button>
      )
    })
  }, [excludeRoleHandler, includeRoleHandler, userRolesArray])

  return (
    <>
      <div className="spacer" />
      <div className="panel-container">{loadingUsers ? <div className="panel-loader">{getText('loading')}</div> : renderUsers()}</div>
      <UniversalModal isVisible={showUpdateRolesModal} toggle={toggleUpdateRolesModal}>
        <p className="panel-modal-object">{currentUser.email}</p>
        <p className="panel-modal-title">{getText('panelModalPermission')}</p>
        {renderRoles()}
        <div className="panel-action-buttons__container">
          <button
            type="button"
            onClick={() => updateRoles(currentUser, userRolesArray, fetchUsers, toggleUpdateRolesModal)}
            className="panel-action-buttons__container__item panel-action-buttons__container__item--green"
          >
            {getText('panelSave')}
          </button>
          <button type="button" onClick={() => toggleUpdateRolesModal()} className="panel-action-buttons__container__item">
            {getText('panelCancel')}
          </button>
        </div>
      </UniversalModal>

      <UniversalModal isVisible={showDeleteUserModal} toggle={toggleDeleteUserModal}>
        <p className="panel-modal-object">{currentUser.email}</p>
        <p className="panel-modal-title">{getText('panelModalRemoveApproval')}</p>
        <div className="panel-action-buttons__container">
          <button
            type="button"
            onClick={() => deleteUser(currentUser, toggleDeleteUserModal, fetchUsers)}
            className="panel-action-buttons__container__item panel-action-buttons__container__item--red"
          >
            {getText('panelRemove')}
          </button>
          <button type="button" onClick={() => toggleDeleteUserModal()} className="panel-action-buttons__container__item">
            {getText('panelCancel')}
          </button>
        </div>
      </UniversalModal>
    </>
  )
})

export default Users
