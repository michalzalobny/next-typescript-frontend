import React, { useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import FocusTrap from 'focus-trap-react'
import navClose from '../../public/siteImages/nav-close.svg'
import navArrow from '../../public/siteImages/gallery-navigation.svg'
import useText from '../Hooks/useText'
import { ImageType } from '../../../types/sharedTypes'

type Props = {
  showGallery: boolean
  setShowGallery: React.Dispatch<React.SetStateAction<boolean>>
  currentPhoto: number
  setCurrentPhoto: React.Dispatch<React.SetStateAction<number>>
  images: ImageType[]
  folderName: string
}

const LightGalleryView = React.memo<Props>((props) => {
  const { showGallery, setShowGallery, currentPhoto, setCurrentPhoto, images, folderName } = props
  const getText = useText()
  const [startPosition, setStartPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const galleryRef = useRef<HTMLDivElement | null>(null)

  const partToScroll = 10
  const swipeInitialDuration = '0s'
  const swipeFinalDuration = '0.4s'

  const containerStyle = {
    width: `${images.length * 100}vw`,
    transform: `translate3d(${-currentPhoto * 100}vw,0,0`,
  }

  const changeCurrentPhoto = React.useCallback(
    (direction) => {
      if (galleryRef.current !== null) {
        galleryRef.current.style.transitionDuration = swipeFinalDuration
      }
      if (direction === 'right') {
        setCurrentPhoto(currentPhoto + 1)
      } else {
        setCurrentPhoto(currentPhoto - 1)
      }
    },
    [currentPhoto, setCurrentPhoto]
  )

  useEffect(() => {
    if (showGallery) {
      if (galleryRef.current !== null) {
        galleryRef.current.style.transitionDuration = swipeInitialDuration
      }
    }
  }, [showGallery])

  const imageSizeHandler = React.useCallback((node) => {
    if (node) {
      const x = node.naturalWidth
      const y = node.naturalHeight
      const windowX = window.innerWidth
      const windowY = window.innerHeight

      const windowRatio = windowX / windowY
      const objectRatio = x / y

      const shortX = 0.95 * windowX
      const shortY = 0.95 * windowY

      // Przy --width
      const factorX = x / shortX
      const imagineY = y / factorX

      // Przy --height
      const factorY = y / shortY
      const imagineX = x / factorY

      const minusX = windowX - imagineX
      const minusY = windowY - imagineY

      // -100px to just trigger it faster by 100px

      if (x > windowX - 100 || y > windowY - 100) {
        if (objectRatio > 1) {
          if (windowRatio > 1) {
            if (minusX < 0) {
              node.classList.add('light-gallery__slide-container__slide__img--width')
            } else {
              node.classList.add('light-gallery__slide-container__slide__img--height')
            }
          } else if (windowRatio < 1) {
            node.classList.add('light-gallery__slide-container__slide__img--width')
          } else {
            node.classList.add('light-gallery__slide-container__slide__img--width')
          }
        } else if (objectRatio < 1) {
          if (windowRatio > 1) {
            node.classList.add('light-gallery__slide-container__slide__img--height')
          } else if (windowRatio < 1) {
            if (minusY < 0) {
              node.classList.add('light-gallery__slide-container__slide__img--height')
            } else {
              node.classList.add('light-gallery__slide-container__slide__img--width')
            }
          } else {
            node.classList.add('light-gallery__slide-container__slide__img--height')
          }
        } else if (windowRatio > 1) {
          node.classList.add('light-gallery__slide-container__slide__img--height')
        } else if (windowRatio < 1) {
          node.classList.add('light-gallery__slide-container__slide__img--width')
        } else {
          node.classList.add('light-gallery__slide-container__slide__img--width')
        }
      }
    }
  }, [])

  const dragStartHandler = React.useCallback(
    (clientX) => {
      setStartPosition(clientX)
      if (!isDragging) {
        setIsDragging(true)
        if (galleryRef.current !== null) {
          galleryRef.current.style.transitionDuration = swipeInitialDuration
        }
      }
    },
    [isDragging]
  )

  const dragOverHandler = React.useCallback(
    (clientX) => {
      if (isDragging) {
        if (galleryRef.current !== null) {
          galleryRef.current.style.transform = `translate3d(${-(currentPhoto * window.innerWidth + startPosition - clientX)}px,0,0)`
        }
      }
    },
    [currentPhoto, isDragging, startPosition]
  )

  const dragEndHandler = React.useCallback(
    (endPosition) => {
      if (isDragging) {
        setIsDragging(false)
        if (galleryRef.current !== null) {
          galleryRef.current.style.transitionDuration = swipeFinalDuration
        }

        const triggerBoundary = window.innerWidth / partToScroll
        const userDifference = startPosition - endPosition
        const userDifferenceLeft = endPosition - startPosition
        if (userDifference > 0) {
          if (userDifference > triggerBoundary) {
            if (currentPhoto + 1 > images.length - 1) {
              const translateValue = window.innerWidth * currentPhoto
              if (galleryRef.current !== null) {
                galleryRef.current.style.transform = `translate3d(${-translateValue}px,0,0)`
              }
            } else {
              changeCurrentPhoto('right')
            }
          } else {
            const translateValue = window.innerWidth * currentPhoto
            if (galleryRef.current !== null) {
              galleryRef.current.style.transform = `translate3d(${-translateValue}px,0,0)`
            }
          }
        } else if (userDifference === 0) {
          // User clicked PPM
        } else if (userDifferenceLeft > triggerBoundary) {
          if (currentPhoto - 1 < 0) {
            const translateValue = window.innerWidth * currentPhoto
            if (galleryRef.current !== null) {
              galleryRef.current.style.transform = `translate3d(${-translateValue}px,0,0)`
            }
          } else {
            changeCurrentPhoto('left')
          }
        } else {
          const translateValue = window.innerWidth * currentPhoto
          if (galleryRef.current !== null) {
            galleryRef.current.style.transform = `translate3d(${-translateValue}px,0,0)`
          }
        }
      }
    },
    [changeCurrentPhoto, currentPhoto, images.length, isDragging, startPosition]
  )

  const arrowHandler = React.useCallback(
    (key) => {
      if (galleryRef.current !== null) {
        galleryRef.current.style.transitionDuration = '0s'
      }
      if (key === 37) {
        if (currentPhoto - 1 >= 0) {
          setCurrentPhoto(currentPhoto - 1)
        }
      } else if (key === 39) {
        if (currentPhoto + 1 <= images.length - 1) {
          setCurrentPhoto(currentPhoto + 1)
        }
      }
    },
    [currentPhoto, images.length, setCurrentPhoto]
  )

  let rightBtnClasses = ['light-gallery__nav__arrow', 'light-gallery__nav__arrow--right']
  if (isDragging) {
    rightBtnClasses = rightBtnClasses.concat('light-gallery__nav__arrow--right--dragging')
  } else {
    rightBtnClasses = rightBtnClasses.filter((className) => className !== 'light-gallery__nav__arrow--right--dragging')
  }

  let leftBtnClasses = ['light-gallery__nav__arrow', 'light-gallery__nav__arrow--left']
  if (isDragging) {
    leftBtnClasses = leftBtnClasses.concat('light-gallery__nav__arrow--left--dragging')
  } else {
    leftBtnClasses = leftBtnClasses.filter((className) => className !== 'light-gallery__nav__arrow--left--dragging')
  }

  const closeGalleryHandler = React.useCallback(
    (target) => {
      if (target.className === 'light-gallery__slide-container__slide') {
        setIsDragging(false)
        setShowGallery(false)
        setStartPosition(0)
      }
    },
    [setShowGallery]
  )

  return (
    <>
      <CSSTransition in={showGallery} unmountOnExit classNames="gallery-open" timeout={400}>
        <FocusTrap active={showGallery}>
          <div
            role="button"
            tabIndex={-1}
            onKeyDown={(e) => {
              arrowHandler(e.which)
            }}
            className="light-gallery"
          >
            {currentPhoto === 0 ? null : (
              <button
                aria-label={getText('labelPreviousPhoto')}
                type="button"
                onClick={() => changeCurrentPhoto('left')}
                className={leftBtnClasses.join(' ')}
              >
                <img src={navArrow} alt="" />
              </button>
            )}

            {currentPhoto === images.length - 1 ? null : (
              <button
                aria-label={getText('labelNextPhoto')}
                type="button"
                onClick={() => changeCurrentPhoto('right')}
                className={rightBtnClasses.join(' ')}
              >
                <img src={navArrow} alt="" />
              </button>
            )}

            <button
              aria-label={getText('labelCloseGallery')}
              type="button"
              onClick={() => setShowGallery(false)}
              className="light-gallery__nav__close"
            >
              <img src={navClose} alt="" />
            </button>

            <div ref={galleryRef} style={containerStyle} className="light-gallery__slide-container">
              {images.map((imageObject) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    closeGalleryHandler(e.target)
                  }}
                  key={imageObject.src}
                  draggable="false"
                  className="light-gallery__slide-container__slide"
                >
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                  <img
                    onTouchStart={(e) => {
                      dragStartHandler(e.touches[0].clientX)
                    }}
                    onPointerDown={(e) => {
                      dragStartHandler(e.clientX)
                    }}
                    onTouchMove={(e) => {
                      dragOverHandler(e.touches[0].clientX)
                    }}
                    onPointerMove={(e) => {
                      dragOverHandler(e.clientX)
                    }}
                    onTouchEnd={(e) => {
                      dragEndHandler(e.changedTouches[0].clientX)
                    }}
                    onMouseUp={(e) => {
                      dragEndHandler(e.clientX)
                    }}
                    ref={(e) => {
                      imageSizeHandler(e)
                    }}
                    draggable="false"
                    className="light-gallery__slide-container__slide__img"
                    src={require(`../../public/userImages/${folderName}/${imageObject.src}?webp`)}
                    alt={imageObject.alt}
                    style={{ cursor: `${isDragging ? 'grabbing' : 'grab'}` }}
                  />
                </button>
              ))}
            </div>
          </div>
        </FocusTrap>
      </CSSTransition>
    </>
  )
})
export default LightGalleryView
