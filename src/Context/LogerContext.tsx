import React, { createContext, useContext, useState } from 'react'
import useModal from '../Hooks/useModal'
import { LogerModeTypes } from '../../types/sharedTypes'

type Props = {
  children: React.ReactNode
}

type LogerContextTypes = {
  showLoger: boolean
  changeLogerMode: (mode: LogerMode) => void
  toggleShowLoger: () => void
  logerMode: LogerModeTypes
}

type LogerMode = LogerContextTypes['logerMode']

const LogerContext = createContext<LogerContextTypes | undefined>(undefined)

const LogerContextProvider = React.memo<Props>((props) => {
  const { children } = props
  const [logerMode, setLogerMode] = useState<LogerMode>('login')
  const { show: showLoger, toggle: toggleShowLoger } = useModal()

  const changeLogerMode = React.useCallback((mode: LogerMode) => {
    setLogerMode(mode)
  }, [])

  return (
    <LogerContext.Provider
      value={{
        logerMode,
        changeLogerMode,
        showLoger,
        toggleShowLoger,
      }}
    >
      {children}
    </LogerContext.Provider>
  )
})
export default LogerContextProvider

export const useLogerContext = () => {
  const ctx = useContext(LogerContext)
  if (ctx === undefined) {
    throw new Error('useLogerContext must be used within a LogerContextProvider')
  }
  return ctx
}
