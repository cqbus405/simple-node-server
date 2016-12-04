import index from './lib/index'
import getLogger from './lib/log4js.js'

let logger = getLogger('startup')

index((err, result) => {
  if (err) {
    logger.error('error while server is running: ' + err)
  }

  logger.info('server is running @ port ' + result.port + ' ' + result.mode)
})