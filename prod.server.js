const express = require('express')
const config = require('./config/index')

const app = express()
app.use(express.static('./dist'))

const port = process.env.PORT || config.build.port

module.exports = app.listen(port, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listenging at http://localhost:' + port + '\n')
})
