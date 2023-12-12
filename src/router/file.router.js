const Router = require('koa-router')

const {
  verifyAuth
} = require('../middeware/auth.middeware')

const { avatarHandler, pictureHandler, pictureResize
} = require('../middeware/file.middeware')

const {
  saveAvatarInfo, savePicture
} = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)

fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePicture)

module.exports = fileRouter