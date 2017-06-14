import express from 'express'
import orm from 'orm'
import {
  createServer
} from 'http'

import * as util from './util/helper'
import model from './util/_model'
import controller from './util/_controller'
import passport from './util/_passport'
import settings from './config/app.config'
import hookRouter from './controller/router'
import hookExpress from './config/expressConfig'
import hookDB from './config/mysqlConfig'
import getLogger from './util/_log4js.js'

const logger = getLogger('startup')
const app = express()
const mode = process.env.NODE_ENV || 'dev'
const path = 'lib'
const setting = settings[mode]

// 将系统设置和运行模式存放到request全局参数里
app.use((req, res, next) => {
  req.setting = setting
  req.mode = mode
  next()
})

// 加载application-level middleware
hookExpress(app, express)

// 设置数据库模块
model(app, {
  setting: setting,
  hook: hookDB,
  path: `${path}/model`,
  orm: orm,
  mode: mode
}, (err, result, user) => {
  if (err) {
    logger.error(err)
  }

  // 加载认证策略
  passport(user)

  // 读取controller列表
  controller(path + '/controller', (err, controllers) => {
    if (err) {
      logger.error(err)
    }

    // 加载路由
    hookRouter(app, controllers)

    // 创建server并监听请求
    const server = createServer(app);
    server.listen(setting.port, () => {
      logger.info('Server is running on port ' + setting.port + ' ' + mode + '\n mysql: ' + result)
    })
  })
})