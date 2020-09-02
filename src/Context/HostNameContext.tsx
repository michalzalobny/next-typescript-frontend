import React, { createContext, useContext, useState } from 'react'

type Props = {
  hostName: string
  children: React.ReactNode
}

type HostNameTypes = {
  hostNameValue: string
}

const HostName = createContext<HostNameTypes | undefined>(undefined)

const HostNameProvider = React.memo<Props>((props) => {
  const { hostName, children } = props
  const [hostNameValue] = useState<HostNameTypes['hostNameValue']>(hostName)

  return (
    <HostName.Provider
      value={{
        hostNameValue,
      }}
    >
      {children}
    </HostName.Provider>
  )
})
export default HostNameProvider

export const useHostName = () => {
  const ctx = useContext(HostName)
  if (ctx === undefined) {
    throw new Error('useHostName must be used within a HostNameProvider')
  }
  return ctx
}
