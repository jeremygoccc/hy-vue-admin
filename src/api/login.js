import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
    // transformRequest: [function (data) {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }]
  })
}

export function register (data) {
  console.log(data)
  return request({
    url: '/user/register',
    method: 'post',
    data: { ...data }
  })
}

export function getInfo (token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
