const _axios = require('../utils/axios')
// const redis = require('../utils/redis')

module.exports = {
  index: async (ctx, next) => {
    ctx.response.body = `<h1>Index Page</h1>`
  },
  getCategory: async (ctx, next) => {
    console.log(ctx.request)
    console.log('跨域成功')
    await _axios.get(`/getCategory`)
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
    await _axios.get(`/getTag/${ctx.params.id}`)
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
    await _axios.post(`/resign`, form)
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
    await _axios.post(`/login`, ctx.request.body)
      .then(res => {
        if (res.data.code === 200) {
          ctx.response.body = res.data.data
        } else {
          ctx.response.body = res.data.msg
        }
      })
      .catch(err => console.log(err))
  },
  logout: async (ctx, next) => {
    ctx.response.body = {
      code: 20000
    }
  },
  toEmail: async (ctx, next) => {
    console.log(`ctx.params.id: ${ctx.params.id}`)
    console.log(`ctx.request.body.username: ${ctx.request.body.username}`)
    console.log(`ctx.request.body.token: ${ctx.request.body.token}`)
    await _axios.post(`/toEmail/${ctx.params.id}`, ctx.request.body)
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
