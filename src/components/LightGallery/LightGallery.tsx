import React from 'react'
import dynamic from 'next/dynamic'
import useLightGallery from '../Hooks/useLightGallery'
import { LazyImage } from './LazyImage/LazyImage'
import { ImageType } from '../../../types/sharedTypes'

const LightGalleryViewNoSSR = dynamic(() => import('./LightGalleryView'), {
  ssr: false,
})

type Props = {
  images: ImageType[]
  classNames: string
  folderName: string
}

const LightGallery = React.memo<Props>((props) => {
  const { images, classNames, folderName } = props
  const { showGallery, setShowGallery, currentPhoto, setCurrentPhoto } = useLightGallery()
  return (
    <>
      <div className={classNames}>
        {images.map((imageObject, key) => {
          return (
            <a
              onClick={(e) => {
                e.preventDefault()
                setShowGallery(true)
                setCurrentPhoto(key)
              }}
              aria-label={imageObject.alt}
              href={require(`../../public/userImages/${folderName}/${imageObject.src}?webp`)}
              key={imageObject.src}
              className={`${classNames}__figure`}
            >
              <LazyImage folderName={folderName} imageClassName={`${classNames}__figure__img`} imageObject={imageObject} />
            </a>
          )
        })}
      </div>
      <LightGalleryViewNoSSR
        folderName={folderName}
        showGallery={showGallery}
        setShowGallery={setShowGallery}
        currentPhoto={currentPhoto}
        setCurrentPhoto={setCurrentPhoto}
        images={images}
      />
    </>
  )
})
export default LightGallery
