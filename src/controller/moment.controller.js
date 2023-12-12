const fs = require('fs')

const fileService = require('../service/file.service');
const momentService = require('../service/monent.service');

const { PICTURE_PATH } = require('../constants/file.path')


class MomentController {
  // 发布动态
  async create(ctx, next) {
    //  1.获取数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    // 2.将数据插入到数据库中
    await momentService.create(userId, content)
    ctx.body = '发布动态成功'
  }

  // 获取详情
  async detail(ctx, next) {
    // 1. 获取数据(momentId) 
    const momentId = ctx.params.momentId;
    // 2. 根据id去查询这条数据
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  // 获取列表
  async list(ctx, next) {
    // 1. 获取数据(offset,size) 
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }

  // 修改
  async update(ctx, next) {
    // 1. 获取参数 
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    // 2.修改内容
    await momentService.update(content, momentId)

    ctx.body = '修改成功'
  }

  // 删除
  async remove(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params

    // 2.删除内容
    await momentService.remove(momentId)

    ctx.body = '删除成功'
  }

  // 给文章添加多个标签
  async addLabels(ctx, next) {

    // 1.获取标签和动态id
    const { labels } = ctx;
    const { momentId } = ctx.params;
    console.log(ctx, 'momentId')
    // 2.添加所有的标签

    for (let label of labels) {
      // 2.1.判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(momentId, label.id);
      console.log(isExist, 'isExist')
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = '添加标签成功'
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController()