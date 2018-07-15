import { login, logout, getInfo, register } from '@/api/login'
import { getToken, setToken, delToken } from '@/utils/auth'

const user = {
  // 单一状态树, 页面状态管理容器对象
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  // 更改状态事件, 必须同步执行, 状态改变操作方法
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  // 可异步, 提交 mutation, 操作行为处理模块
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username.trim(), userInfo.password.trim()).then(response => {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    Register ({ commit }, userData) {
      return new Promise((resolve, reject) => {
        register(userData).then(response => {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          console.log(data)
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          delToken()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        delToken()
        resolve()
      })
    }
  }
}

export default user
