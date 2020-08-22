/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const express = require('express')
const next = require('next')

const PORT = process.env.NEXT_PUBLIC_APP_PORT_FRONT
const dev = process.env.NODE_ENV !== 'production'
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = next({ dev })

const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/*', (req, res, nextStep) => {
      if (req.headers.host.match(/^www/) !== null) {
        res.redirect(`https://${req.headers.host.replace(/^www\./, '')}${req.url}`)
      } else {
        nextStep()
      }
    })

    server.use('/api', createProxyMiddleware({ target: process.env.NEXT_PUBLIC_APP_PATH_API, changeOrigin: true }))

    // Default catch-all handler to allow Next.js to handle all other routes
    server.get('*', (req, res) => handle(req, res))

    server.listen(PORT, () => console.log(`NEXT ready at port:${PORT}`))
  })
  .catch((err) => {
    throw new Error(err)
  })
