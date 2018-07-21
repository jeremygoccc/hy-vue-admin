const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')

const app = new Koa()

const port = 3600

app.use(bodyParser())
router(app)

app.listen(port, () => {
  console.log(`koa server is running on the port ${port}`)
})
