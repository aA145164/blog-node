const Router = require('koa-router')

const { verifyAuth, verifyPermission } = require('../middeware/auth.middeware')

const { create, reply, update, remove, list } = require('../controller/comment.controller.js')


const commentRouter = new Router({ prefix: '/comment' });

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/reply/:commentId', verifyAuth, reply)

// 修改评论
commentRouter.patch('/update/:commentId', verifyAuth, verifyPermission('comment'), update)

// 删除评论
commentRouter.delete('/remove/:commentId', verifyAuth, verifyPermission('comment'), remove)

// 获取评论列表
commentRouter.get('/', list)

module.exports = commentRouter