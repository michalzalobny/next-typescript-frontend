import React from 'react'
import axios from '../../../../utils/axiosInstance'
import { UserType } from '../../../../../types/sharedTypes'
import { useServerResponse } from '../../../Hooks/useServerResponse'

type PropsTypes = {
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  setLoadingUsers: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchUsers = (setUsers: PropsTypes['setUsers'], setLoadingUsers: PropsTypes['setLoadingUsers']) => {
  const { flashFailResponse } = useServerResponse()
  const fetchUsers = React.useCallback(() => {
    setLoadingUsers(true)
    axios
      .get('/user/getallusers')
      .then((response) => {
        setUsers(response.data)
        setLoadingUsers(false)
      })
      .catch(() => {
        flashFailResponse(undefined)
        setUsers([])
        setLoadingUsers(false)
      })
  }, [flashFailResponse, setLoadingUsers, setUsers])

  return {
    fetchUsers,
  }
}
