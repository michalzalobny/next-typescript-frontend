import React from 'react'
import { useFlashContext } from '../../../Context/FlashContext'
import axios from '../../../../axiosInstance'
import useText from '../../../Hooks/useText'
import { UserType } from '../../../../../types/sharedTypes'

type PropsTypes = {
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  setLoadingUsers: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchUsers = (setUsers: PropsTypes['setUsers'], setLoadingUsers: PropsTypes['setLoadingUsers']) => {
  const getText = useText()
  const infoError = getText('infoError')
  const { addFlash } = useFlashContext()
  const fetchUsers = React.useCallback(() => {
    setLoadingUsers(true)
    axios
      .get('/user/getallusers')
      .then((response) => {
        setUsers(response.data)
        setLoadingUsers(false)
      })
      .catch(() => {
        addFlash({
          flashText: infoError,
          flashType: 'fail',
        })
        setUsers([])
        setLoadingUsers(false)
      })
  }, [addFlash, infoError, setLoadingUsers, setUsers])

  return {
    fetchUsers,
  }
}
