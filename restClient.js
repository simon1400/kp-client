import axios from 'axios'

const AxiosPAY = axios.create({
  baseURL: process.env.PAY_API
})

export default AxiosPAY
