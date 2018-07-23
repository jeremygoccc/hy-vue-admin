const rediz = require('redis')
const Q = require('bluebird')

Q.promisifyAll(rediz.RedisClient.prototype)
Q.promisifyAll(rediz.Multi.prototype)

const redis = rediz.createClient({
  'host': '127.0.0.1',
  'port': '6379'
})

redis.on('error', err => {
  console.log('error event - ' + redis.host + ':' + redis.port + '-' + err)
})

module.exports = redis
