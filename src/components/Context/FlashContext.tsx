import React, { createContext, useContext, useState } from 'react'
import shortid from 'shortid'

type Props = {
  children: React.ReactNode
}

type FlashObject = {
  flashText: string
  flashType: 'success' | 'info' | 'fail'
}

type FlashObjectWithId = {
  id: string
  flashText: FlashObject['flashText']
  flashType: FlashObject['flashType']
}

type FlashContextTypes = {
  flashArray: FlashObjectWithId[]
  addFlash: (flashContent: FlashObject) => void
}

const FlashContext = createContext<FlashContextTypes | undefined>(undefined)

const FlashContextProvider = React.memo<Props>((props) => {
  const { children } = props
  const [flashArray, setFlashArray] = useState<FlashContextTypes['flashArray']>([])

  const removeFlash = React.useCallback((id: string) => {
    setTimeout(() => {
      setFlashArray((prevArray) => [...prevArray.filter((flashContent) => flashContent.id !== id)])
    }, 3000)
  }, [])

  const addFlash = React.useCallback(
    (flashContent: FlashObject) => {
      const flashContentWithId = { ...flashContent, id: shortid.generate() }
      setFlashArray((prevArray) => [...prevArray, flashContentWithId])
      removeFlash(flashContentWithId.id)
    },
    [removeFlash]
  )

  return <FlashContext.Provider value={{ flashArray, addFlash }}>{children}</FlashContext.Provider>
})

export default FlashContextProvider

export const useFlashContext = () => {
  const ctx = useContext(FlashContext)
  if (ctx === undefined) {
    throw new Error('useFlashContext must be used within a FlashContextProvider')
  }
  return ctx
}
