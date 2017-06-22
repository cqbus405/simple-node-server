import appConfig from '../lib/config/app.config'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import express from 'express'
import routes from './lib/routes.lib'
import router from './routes/router'
import elasticsearch from './lib/elasticsearch.lib'
import redis from './lib/redis.lib'

var app = express()

var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
var settings = appConfig[env]
app.use(function(req, res, next) {
  req.settings = settings
  req.env = env

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'POST, GET')

  next()
})
app.use(redis)
app.use(elasticsearch)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(morgan('short'))
app.use('/static', express.static(path.join(__dirname, '../public')))

let controllers = routes(path.join(__dirname, '../lib/routes'))
router(app, controllers)

app.listen(settings.port, function() {
  console.log('App is running on ' + env + ' mode')
})