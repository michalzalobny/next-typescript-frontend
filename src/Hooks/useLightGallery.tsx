import { useState } from 'react'

const useLightGallery = () => {
  const [showGallery, setShowGallery] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  return {
    showGallery,
    setShowGallery,
    currentPhoto,
    setCurrentPhoto,
  }
}

export default useLightGallery
