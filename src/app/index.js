const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandle = require('./error-handle')
const userRouters = require('../router/index')

const app = new Koa()

app.use(bodyParser())
userRouters(app) //注册路由
app.on('error', errorHandle)

module.exports = app