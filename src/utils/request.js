import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API,
  // baseURL: 'http://localhost:8080',
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()  // 设置请求头携带自定义token
  }
  return config
}, err => {
  console.log(err)
  Promise.reject(err)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(response)
    console.log(res.code)
    console.log(res.token)
    if (res.code !== 20000) {   // code非 20000抛错
      Message({
        messgae: res.messgae,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: 非法token 50012：其它客户端登录 50014：token过期
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出', '确定登出', {
          confirmButtonText: '重新登录'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 重新实例化vue-router对象
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  }, err => {
    console.log('err' + err)
    Message({
      messgae: err.messgae,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)

export default service
