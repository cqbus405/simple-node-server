import bodyParser from 'body-parser'
import log4js from 'log4js'
import getLogger from '../lib/log4js'

let logger = getLogger('http')

export default function(app, express) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use('/static', express.static('public'))
  app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: ':method :url'
  }))
}