import router from '@/router/index'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message, Loading } from 'element-ui'

const whiteList = ['/login', '/index']

const LoadOptions = {
  lock: true,
  text: '加载中',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
}

// router.beforeEach((to, from, next) => {
//   console.log('权限验证')
//   /* eslint-disable no-unused-vars */
//   let loadingInstance = Loading.service(LoadOptions)
//   if (getToken()) {
//     console.log(getToken())
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       console.log('进入后台页')
//       if (store.getters.roles.length === 0) {
//         store.dispatch('GetInfo').then(res => { // 拉取用户信息
//           next()
//         }).catch(err => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error(err || 'Verification failed, please login again')
//             next({ path: '/' })
//           })
//         })
//       } else {
//         next()
//       }
//       next()
//     }
//   } else {
//     if (whiteList.indexOf(to.path.toLowerCase()) !== -1) {
//       next()
//     } else {
//       next({ path: '/index' })
//     }
//   }
// })
// router.afterEach(() => {
//   let loadingInstance = Loading.service(LoadOptions)
//   loadingInstance.close()
// })
