import winston from 'winston'
import moment from 'moment'
import fs from 'fs'
require('winston-daily-rotate-file')

export default (req, res, next) => {
  const env = process.env.NODE_ENV || 'development'
  const logInfoDir = 'log'
  const tsFormat = moment().format('YYYY-MM-DD h:mm:ssa')

  if (!fs.existsSync('log')) fs.mkdirSync('log')
  if (!fs.existsSync(logInfoDir)) fs.mkdirSync(logInfoDir)

  const logger = new(winston.Logger)({
    transports: [
      new(winston.transports.Console)({
        timestamp: () => {
          return tsFormat
        },
        colorize: true,
        level: 'debug',
      }),
      new(winston.transports.DailyRotateFile)({
        filename: `${logInfoDir}/log`,
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        level: env === 'development' ? 'debug' : 'info'
      })
    ]
  })

  req.logger = logger
  next()
}