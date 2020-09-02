import React from 'react'
import { useFlashContext } from '../Context/FlashContext'
import useText from './useText'
import { USE_DIFFERENT_LOGIN_STRATEGY, USER_SHOULD_REGISTER, WRONG_PASSWORD, USER_ALREADY_EXISTS } from '../constants/userMessages'

export const useServerResponse = () => {
  const { addFlash } = useFlashContext()
  const getText = useText()

  const flashFailResponse = React.useCallback(
    (serverResponse: string | string[] | undefined) => {
      const infoDifferentStrategy = getText('infoDifferentStrategy')
      const infoError = getText('infoError')
      const infoShouldRegister = getText('infoShouldRegister')
      const infoWrongData = getText('infoWrongData')
      const infoUserAlreadyExists = getText('userAlreadyExists')
      switch (serverResponse) {
        case USER_ALREADY_EXISTS:
          addFlash({
            flashText: infoUserAlreadyExists,
            flashType: 'fail',
          })
          break
        case USE_DIFFERENT_LOGIN_STRATEGY:
          addFlash({
            flashText: infoDifferentStrategy,
            flashType: 'fail',
          })
          break
        case USER_SHOULD_REGISTER:
          addFlash({ flashText: infoShouldRegister, flashType: 'info' })
          break
        case WRONG_PASSWORD:
          addFlash({ flashText: infoWrongData, flashType: 'fail' })
          break
        default:
          addFlash({
            flashText: infoError,
            flashType: 'fail',
          })
          break
      }
    },
    [addFlash, getText]
  )

  return { flashFailResponse }
}
