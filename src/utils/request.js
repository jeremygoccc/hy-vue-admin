import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: 'https://yapi.homyit.cn/mock/25',
  timeout: 5000
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 设置请求头携带自定义token
  }
  return config
}, err => {
  console.log(err)
  Promise.reject(err)
})

// 设置全局请求次数与间隙
service.defaults.retry = 4
service.defaults.retryDelay = 1000

service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(response)
    // console.log(res.code)
    // console.log(res.token)
    if (res.code !== 20000) { // code非 20000抛错
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
      /* eslint-disable */
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
    let config = err.config
    if (!config || !config.retry) return Promise.reject(err)
    config.__retryCount = config.__retryCount || 0

    if (config.__retryCount >= config.retry) return Promise.reject(err)
    config.__retryCount += 1

    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, config.retryDelay || 1)
    })
    return backoff.then(() => {
      return service(config)
    })
  }
)

export default service
