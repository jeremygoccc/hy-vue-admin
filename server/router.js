const router = require('koa-router')()
// const cors = require('koa-cors')
const HomeController = require('./controller/home')

const whiteOrigins = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082'
]
// const corsOptions = {
//   origin: (origin, callback) => {
//     let originIsWhite = whiteOrigins.indexOf(origin) !== -1
//     callback(null, originIsWhite)
//   }
// }

module.exports = app => {
  // app.use(cors())

  router.all('*', async (ctx, next) => {
    const origin = ctx.headers.origin
    console.log(ctx.headers)
    console.log('进入匹配')
    if (whiteOrigins.indexOf(origin) !== -1) {
      ctx.set('Access-Control-Allow-Origin', origin)
      ctx.set('Access-Control-Allow-Methods', ['GET, POST'])
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, X-Token')
    }
    await next()
  })
  router.get('/', HomeController.index)
  router.get('/getCategorys', HomeController.getCategory)
  router.get('/getTag/:id', HomeController.getTag)
  router.post('/user/register', HomeController.register)
  router.post('/user/login', HomeController.login)
  router.post('/user/logout', HomeController.logout)
  router.post('/toEmail/:id', HomeController.toEmail)

  app.use(router.routes())
    .use(router.allowedMethods())
}
