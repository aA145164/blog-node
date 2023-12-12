const Router = require('koa-router')

const {
  login,
  success
} = require('../controller/auth.controller')

const {
  verifyLogin,
  verifyAuth
} = require('../middeware/auth.middeware')

const authRouter = new Router()

authRouter.post('/login', verifyLogin, login)
authRouter.get('/text', verifyAuth, success)


module.exports = authRouter