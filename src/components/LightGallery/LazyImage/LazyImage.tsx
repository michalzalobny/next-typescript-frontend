import React, { useState } from 'react'
import LazyLoad from 'react-lazyload'
import { ImageType } from '../../../../types/sharedTypes'

type LazyImageProps = {
  folderName: string
  imageClassName: string
  imageObject: ImageType
}

export const LazyImage = React.memo<LazyImageProps>((props) => {
  const { folderName, imageClassName, imageObject } = props
  const [imageLoaded, setImageLoaded] = useState(false)

  const imageLoadedHandler = () => {
    setImageLoaded(true)
  }

  return (
    <>
      <img
        style={{ position: 'absolute', top: '0' }}
        className={`${imageClassName} ${imageClassName}__placeholder`}
        src={require(`../../../public/userImages/${folderName}/${imageObject.src}?lqip`)}
        alt={imageObject.alt}
      />

      <LazyLoad offset={300}>
        <img
          style={{ position: 'absolute', top: '0' }}
          onLoad={() => imageLoadedHandler()}
          className={`${imageClassName} ${imageLoaded ? `${`${imageClassName}__loaded`}` : ''}`}
          src={require(`../../../public/userImages/${folderName}/${imageObject.src}?webp`)}
          alt={imageObject.alt}
        />
      </LazyLoad>
    </>
  )
})
