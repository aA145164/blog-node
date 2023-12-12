const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file.path')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1. 获取图片相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    // 2. 将图像信息保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);

    // 3. 将图片地址保存 user表
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    console.log(avatarUrl, 'avatarUrl')
    await userService.updateAvatarUrlById(avatarUrl, id)

    // 3.返回结果
    ctx.body = {
      code: 200,
      message: '上传头像成功'
    }
  }

  async savePicture(ctx, next) {
    // 1. 获取头像信息
    const files = ctx.req.files;
    console.log(files, 'files')
    const { id } = ctx.user;
    const { momentId } = ctx.query
    // 2.将所有的文件保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId)
    }

    ctx.body = '动态配图上传完成'
  }
}

module.exports = new FileController()