import appConfig from '../lib/config/app.config'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import express from 'express'
import routes from './lib/routes.lib'
import router from './routes/router'
import models from './lib/models.lib'
import elasticsearch from './lib/elasticsearch.lib'
import redis from './lib/redis.lib'
import passport from './lib/passport.lib'
import logger from './lib/winston.lib'

let app = express()
app.use(logger)

let __ROOT__ = path.join(__dirname, '..')
let __IMAGE__ = path.resolve(__ROOT__, './public/images')

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
let settings = appConfig[env]
let model = models(path.join(__dirname, '../lib/models'))
app.use((req, res, next) => {
  req.settings = settings
  req.env = env
  req.models = model
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'POST, GET')
  next()
})
app.use(redis)
app.use(elasticsearch)
app.use(passport)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(morgan('short'))
app.use('/static', express.static(path.join(__dirname, '../public')))

let controllers = routes(path.join(__dirname, '../lib/routes'))
router(app, controllers)

app.listen(settings.port, () => {
  console.log('App is running on ' + env + ' mode. Port: ' + settings.port + ' PID: ' + process.pid)
})