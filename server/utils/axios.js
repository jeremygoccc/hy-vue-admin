const axios = require('axios')
const qs = require('qs')

const _axios = axios.create({
  baseURL: 'https://physic.gongbarry.xyz',
  timeout: 10000
})

_axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
_axios.defaults.transformRequest = [data => {
  return qs.stringify(data)
}]

module.exports = _axios
