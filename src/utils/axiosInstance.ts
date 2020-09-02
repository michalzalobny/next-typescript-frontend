import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_PATH}api`,
  headers: {
    'Cache-Control': 'no-cache',
  },
})

export default instance
