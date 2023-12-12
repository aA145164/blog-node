const Router = require('koa-router')
const {
  create,
  avatarInfo
} = require('../controller/user.controller')

const {
  verifyUser,
  handlePassword
} = require('../middeware/user.middeware')

const userRouter = new Router({ prefix: '/users' });

userRouter.post('/', verifyUser, handlePassword, create);
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter