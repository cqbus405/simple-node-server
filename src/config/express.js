import bodyParser from 'body-parser'
import log4js from 'log4js'
import getLogger from '../lib/log4js'
import session from 'express-session'
import passport from 'passport'

let logger = getLogger('http')

export default function(app, express) {
  app.use('/static', express.static('public'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(session({
    secret: 'keyboard cat'
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: ':method :url'
  }))
}