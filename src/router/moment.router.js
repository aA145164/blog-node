const Router = require('koa-router')

const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')

const { verifyAuth, verifyPermission } = require('../middeware/auth.middeware')

const { verifyLaberExists } = require('../middeware/label.middleware')

const momentRouter = new Router({ prefix: '/moment' });

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);

// 1.用户必须登录 2.用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission('moment'), update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission('moment'), remove);

// 给文章添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission('moment'), verifyLaberExists, addLabels)

// 动态配图服务
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter

