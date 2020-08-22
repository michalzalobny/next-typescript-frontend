import React, { useState } from 'react'
import { useAuthFor } from '../../components/Hooks/useAuthFor'
import useText from '../../components/Hooks/useText'

// PanelElements
import Users from '../../components/Panel/Users/Users'
import { RolesTypes } from '../../../types/sharedTypes'
import { SeoHead } from '../../components/Seo/SeoHead'

type PanelElementInputType = {
  name: string
  panelMode: 'blockposts' | 'users'
  grantedFor: RolesTypes[]
  panelComponent?: JSX.Element
}

const PanelPage = React.memo(() => {
  const getText = useText()
  const textUsers = getText('textUsers')
  const textOther = getText('textOther')
  const authFor = useAuthFor()
  const [currentPanelMode, setCurrentPanelMode] = useState<PanelElementInputType['panelMode'] | null>(null)

  const panelElementInput: PanelElementInputType[] = [
    {
      name: textUsers,
      panelMode: 'users',
      grantedFor: ['admin'],
      panelComponent: <Users key="users" />,
    },
    {
      name: textOther,
      panelMode: 'blockposts',
      grantedFor: ['admin', 'superuser'],
      panelComponent: <Users key="blockposts" />,
    },
  ]

  const panelButtons = panelElementInput.map((panelElement) => {
    if (authFor(panelElement.grantedFor)) {
      return (
        <button
          type="button"
          key={panelElement.panelMode}
          className={`btn panel-btn ${panelElement.panelMode === currentPanelMode ? 'panel-btn--current' : ''}`}
          onClick={() => {
            // Toggler between components
            switch (currentPanelMode) {
              case panelElement.panelMode:
                setCurrentPanelMode(null)
                break
              default:
                setCurrentPanelMode(panelElement.panelMode)
                break
            }
          }}
        >
          {panelElement.name}
        </button>
      )
    }
    return null
  })

  const panelComponent = panelElementInput.map((panelElement) => {
    if (authFor(panelElement.grantedFor) && panelElement.panelMode === currentPanelMode) {
      return panelElement.panelComponent
    }
    return null
  })

  if (authFor(['admin', 'superuser'])) {
    return (
      <>
        <SeoHead metaDescription="" pageTitle={getText('footerPanel')} dontIndex />
        <div className="spacer" />
        <div className="container">
          <h3 className="universal-title universal-title--center">
            {getText('footerPanel')}
            <span className="universal-title--dot">.</span>
          </h3>
          <div className="spacer" />
          <div className="panel-btn__container">
            {panelButtons}
            {panelComponent}
          </div>
        </div>
        <div className="spacer" />
      </>
    )
  }
  return (
    <>
      <SeoHead metaDescription="" pageTitle={getText('noAccess')} dontIndex />
      <div className="container">
        <div className="spacer" />
        <h3 className="universal-title">
          {getText('noAccess')}
          <span className="universal-title--dot">.</span>
        </h3>
      </div>
    </>
  )
})

export default PanelPage
