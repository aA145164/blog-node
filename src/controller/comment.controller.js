const service = require('../service/comment.service.js')

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;
    await service.create(momentId, content,
      id);
    ctx.body = '发表成功'
  };

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    await service.reply(momentId, content,
      commentId, id);

    ctx.body = '回复成功'
  };

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    await service.update(commentId, content)

    ctx.body = '修改成功'
  };

  async remove(ctx, next) {
    const { commentId } = ctx.params
    await service.remove(commentId)
    ctx.body = '删除成功'
  }

  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await service.getCommentByMonentId(momentId)
    ctx.body = result
  }
}

module.exports = new CommentController()