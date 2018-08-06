const _axios = require('../utils/axios')

module.exports = {
  getInfo: async (ctx, next) => {
    console.log(ctx.params.id)
    console.log(ctx.request.query)
    await _axios.get(`/getInfo/${ctx.params.id}?token=${ctx.request.query.token}`)
      .then(res => {
        console.log(res)
        // ctx.response.body = res.data
        if (res.data.code === 200) {
          ctx.response.body = res.data.data
        } else {
          ctx.response.body = res.data.msg
        }
      })
      .catch(err => console.log(err))
  },
  toEmail: async (ctx, next) => {
    // console.log(`ctx.params.id: ${ctx.params.id}`)
    // console.log(`ctx.request.body.username: ${ctx.request.body.username}`)
    // console.log(`ctx.request.body.token: ${ctx.request.body.token}`)
    await _axios.post(`/toEmail/${ctx.params.id}`, ctx.request.body)
      .then(res => {
        console.log(res)
        // if (res.data.code === 200 || res.data.status === 200) {
        //   ctx.response.body = res.data.info
        // } else {
        //   ctx.response.body = res.data.msg
        // }
        ctx.response.body = res.data
      })
      .catch(err => console.log(err))
  }
}
