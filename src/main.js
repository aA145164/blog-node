const app = require('./app/index.js')
require('./app/datebase.js')

const config = require('./app/config.js')

app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`)
})