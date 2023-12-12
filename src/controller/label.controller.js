const service = require('../service/label.service')

class LaberController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    await service.create(name)
    ctx.body = '添加成功'
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query
    const result = await service.getLabels(limit, offset)

    ctx.body = result
  }
}

module.exports = new LaberController()