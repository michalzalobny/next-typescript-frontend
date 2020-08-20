import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'

const fontFirst = 'https://cloud.zalobny.usermd.net/fonts/open-sans/open-sans-v17-latin-regular.woff2'
const fontSecond = 'https://cloud.zalobny.usermd.net/fonts/open-sans/open-sans-v17-latin-800.woff2'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="pl">
        <Head>
          <link rel="preload" as="font" type="font/woff2" href={fontFirst} crossOrigin="anonymous" />
          <link rel="preload" as="font" type="font/woff2" href={fontSecond} crossOrigin="anonymous" />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
