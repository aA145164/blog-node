const fs = require('fs')

const service = require('../service/user.service')
const FileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file.path')

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body

    //查询数据
    await service.create(user)

    //返回数据
    ctx.body = '注冊成功'
  }

  async avatarInfo(ctx, next) {
    // 1. 用户头像是哪个文件
    const { userId } = ctx.params
    const avatarInfo = await FileService.getAvatarByUserId(userId)

    // 2. 提供图片信息
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()