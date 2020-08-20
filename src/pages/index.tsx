import React from 'react'

import LightGallery from '../components/LightGallery/LightGallery'
import { SeoHead } from '../components/Seo/SeoHead'
// import img2 from '../public/userImages/mygallery/2.jpg'
import PageFormData from '../components/Data/PageFormData/PageFormData'

const IndexPage = React.memo(() => {
  return (
    <>
      <SeoHead
        pageTitle="Lazy loading w praktyce"
        metaDescription="Myślałaś/eś kiedyś jak działa lazy loading? Na tej stronie się przekonasz."
        customImage="/7.jpg"
      />
      <div className="container">
        <div className="container">
          <PageFormData />
        </div>
      </div>

      <div className="spacer" />
      <h1 style={{ textAlign: 'center' }} className="universal-title">
        Lazy loading - Scrolluj szybko <span className="universal-title--dot">;&#41;</span>
      </h1>

      <div className="spacer" />

      <div className="container">
        <div className="container">
          <div className="spacer" />
          {/* <img src={img2} alt="" /> */}
          <div className="spacer" />
          <LightGallery
            folderName="mygallery"
            images={[
              { src: '1.jpg', alt: 'jotde' },
              { src: '7.jpg', alt: 'jotde' },
              { src: '6.jpg', alt: 'jotde' },
              { src: '4.jpg', alt: 'jotde' },
            ]}
            classNames="my-gallery"
          />
          <div className="spacer" />
        </div>
      </div>
      <div className="spacer" />
    </>
  )
})

export default IndexPage

// <LightGallery images={[img1]} classNames="my-gallery" />

// const dolRef = useRef()

// useEffect(()=>{
//   const scrollToElement = (element) =>{element.current.scrollIntoView({behavior: 'smooth',block: 'center',inline: 'center',})}
//   if(window.location.hash==='#dol'){
//     scrollToElement(dolRef)
//   }
// },[])

// <div ref={dolRef} id="dol"></div>

// const photos = ['/static/userImages/5.jpg','/static/userImages/3.jpg','/static/userImages/5.jpg']
// <GalleryRender galleryName={'first'} photos={photos}></GalleryRender>

//   <LightGallery images={[img1, img2]} classNames="my-gallery" />
