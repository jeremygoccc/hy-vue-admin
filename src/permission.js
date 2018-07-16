import router from './router/index'
import NProgress from 'nprogress'
import store from './store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  console.log('权限验证')
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/'})
      NProgress.done()
    } else {
      // console.log('进入后台页')
      // if (store.getters.roles.length === 0) {
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     next()
      //   }).catch(err => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err || 'Verification failed, please login again')
      //       next({ path: '/' })
      //     })
      //   })
      // } else {
      //   next()
      // }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
