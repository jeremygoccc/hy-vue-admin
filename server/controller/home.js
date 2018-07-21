const axios = require('axios')
const qs = require('qs')
const BASE_URL = 'https://physic.gongbarry.xyz'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [data => {
  return qs.stringify(data)
}]
// axios.defaults.transformResponse = [data => {
//   return JSON.parse(data)
// }]

module.exports = {
  index: async (ctx, next) => {
    ctx.response.body = `<h1>Index Page</h1>`
  },
  getCategory: async (ctx, next) => {
    console.log(ctx.request)
    console.log('跨域成功')
    await axios.get(`${BASE_URL}/getCategory`)
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          ctx.response.body = res.data.data
        } else {
          ctx.response.body = res.data.msg
        }
      })
      .catch(err => console.log(err))
  },
  getTag: async (ctx, next) => {
    console.log(ctx.params)
    await axios.get(`${BASE_URL}/getTag/${ctx.params.id}`)
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          ctx.response.body = res.data.data
        } else {
          ctx.response.body = res.data.msg
        }
      })
      .catch(err => console.log(err))
  },
  register: async (ctx, next) => {
    console.log(ctx.request.body)
    // ctx.response.body = `<h1>user register</h1>`
    let registerForm = ctx.request.body
    let form = {
      add_tag: registerForm.addTag.join(','),
      category: registerForm.category[1],
      ename: registerForm.e_name,
      name: registerForm.c_name,
      password: registerForm.password,
      myurl: registerForm.privateURL,
      tag: registerForm.tag.join(','),
      username: registerForm.email,
      phone: registerForm.phone,
      unit: registerForm.unit
    }
    console.log(form)
    await axios.post(`${BASE_URL}/resign`, form)
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          ctx.response.body = res.data.data
        } else {
          ctx.response.body = res.data.msg
        }
      })
      .catch(err => console.log(err))
  },
  login: async (ctx, next) => {
    await axios.post(`${BASE_URL}/login`, ctx.request.body)
      .then(res => {
        if (res.data.code === 200) {
          ctx.response.body = res.data.data
        } else {
          ctx.response.body = res.data.msg
        }
      })
      .catch(err => console.log(err))
  },
  toEmail: async (ctx, next) => {
    console.log(`ctx.params.id: ${ctx.params.id}`)
    console.log(`ctx.request.body.username: ${ctx.request.body.username}`)
    console.log(`ctx.request.body.token: ${ctx.request.body.token}`)
    await axios.post(`${BASE_URL}/toEmail/${ctx.params.id}`, ctx.request.body)
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          ctx.response.body = res.data.data
        } else {
          ctx.response.body = res.data.msg
        }
      })
      .catch(err => console.log(err))
  }
}
