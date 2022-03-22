import axios from 'axios'

const AxiosPAY = axios.create({
  baseURL: process.env.PAY_API
})

export const AxiosCLIENT = axios.create({
  baseURL: process.env.APP_DOMAIN+'/api'
})

export const AxiosSTRAPI = axios.create({
  baseURL: process.env.APP_API
})

export default AxiosPAY
