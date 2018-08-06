const axios = require('axios')
const BASE_URL = 'https://yapi.homyit.cn/mock/25'

module.exports = {
  getStu: async (ctx, next) => {
    await axios.get(`${BASE_URL}/info/studentList`)
      .then(res => {
        console.log(res)
        ctx.response.body = res.data
      })
      .catch(err => console.log(err))
  },
  getTea: async (ctx, next) => {
    await axios.get(`${BASE_URL}/info/teacherList`)
      .then(res => {
        ctx.response.body = res.data
      })
      .catch(err => console.log(err))
  },
  getClass: async (ctx, next) => {
    await axios.get(`${BASE_URL}/info/classList`)
      .then(res => {
        ctx.response.body = res.data
      })
      .catch(err => console.log(err))
  }
}
