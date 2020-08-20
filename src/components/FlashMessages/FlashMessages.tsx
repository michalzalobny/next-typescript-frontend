import React from 'react'
import { useFlashContext } from '../Context/FlashContext'

const FlashMessages = React.memo(() => {
  const { flashArray } = useFlashContext()
  const flashItems = flashArray.map((item) => {
    const type = item.flashType
    return (
      <div key={item.id} className={`section-flash-messages__container__item section-flash-messages__container__item--${type}`}>
        <span className="section-flash-messages__container__item__text">{item.flashText}</span>
      </div>
    )
  })
  return <div className="section-flash-messages__container">{flashItems}</div>
})

export default FlashMessages
