import bodyParser from 'body-parser'
import log4js from 'log4js'
import getLogger from '../lib/log4js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'

let logger = getLogger('http')

export default function(app, express) {
  app.use('/static', express.static('public'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(cookieParser())
  app.use(session({
    secret: 'keyboard cat'
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: ':method :url'
  }))
  app.use('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
      /让options请求快速返回/
    } else {
      next();
    }
  })
}