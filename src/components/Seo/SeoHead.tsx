import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import { useHostName } from '../Context/HostNameContext'
import { Favicon } from './Favicon'
import { GoogleAnalytics } from './GoogleAnalytics'

type Props = {
  metaDescription: string
  pageTitle: string
  dontIndex?: boolean
  customImage?: string | undefined
  isArticle?: boolean
}

export const SeoHead = React.memo<Props>(function SeoHeadMemo(props) {
  const { dontIndex, metaDescription, pageTitle, customImage, isArticle } = props
  const { hostNameValue } = useHostName()
  const router = useRouter()
  const defaultImage = '/ogimage.png'
  const OgUrl = `https://${hostNameValue}`

  return (
    <Head>
      <html lang="pl" />
      <title>{pageTitle === '' ? process.env.NEXT_PUBLIC_APP_NAME : `${pageTitle} - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      <meta name="description" content={metaDescription} />
      {dontIndex ? <meta name="robots" content="noindex, follow" /> : null}

      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={typeof customImage !== 'undefined' ? `${OgUrl}${customImage}` : `${OgUrl}${defaultImage}`} />
      <meta property="og:url" content={`${OgUrl}${router.pathname}`} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_APP_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {/* <meta name="twitter:site" content="@lexascms" /> */}
      <Favicon />
      {dontIndex ? null : <GoogleAnalytics />}
    </Head>
  )
})
