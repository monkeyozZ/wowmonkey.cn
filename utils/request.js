import axios from 'axios'
const apiConfig = require('~/config/api.config')
const service = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

service.interceptors.request.use((config) => {
  // 在发送请求之前做一些事情
  return config
}, (error) => {
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  // 对响应数据做点什么
  (error) => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })
export default service
