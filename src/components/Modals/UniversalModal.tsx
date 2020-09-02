import React from 'react'
import { CSSTransition } from 'react-transition-group'
import FocusTrap from 'focus-trap-react'
import modalCloseBtn from '../../public/siteImages/closeicon.svg'
import useText from '../../Hooks/useText'

type Props = {
  toggle: () => void
  children: React.ReactNode
  isVisible: boolean
  classNames?: string
}

const UniversalModal = React.memo<Props>((props) => {
  const { toggle, children, isVisible, classNames } = props
  const getText = useText()
  return (
    <FocusTrap active={isVisible}>
      <div className="modal">
        <CSSTransition in={isVisible} unmountOnExit classNames="modal-fade-opacity" timeout={400}>
          <button type="button" tabIndex={-1} aria-label={getText('labelCloseModal')} onClick={toggle} className="modal__background" />
        </CSSTransition>
        <CSSTransition in={isVisible} unmountOnExit classNames="modal-fade-translate" timeout={400}>
          <div className={`modal__container modal__container--${classNames}`}>
            <button aria-label={getText('labelCloseModal')} type="button" className="modal__close__container" onClick={toggle}>
              <img className="modal__close" src={modalCloseBtn} alt={getText('labelCloseModal')} />
            </button>
            {children}
          </div>
        </CSSTransition>
      </div>
    </FocusTrap>
  )
})

export default UniversalModal
