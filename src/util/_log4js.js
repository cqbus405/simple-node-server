import fs from 'fs'
import log4js from 'log4js'
import path from 'path'

export default function(category) {
  try {
    fs.mkdirSync('./log')
  } catch (e) {
    if (e.code != 'EEXIST') {
      console.error('Could not set up log directory, error was: ' + e);
      process.exit(1)
    }
  }

  log4js.configure(path.resolve(__dirname, '../../src/config/log4js.json'))
  let log = log4js.getLogger(category)

  return log
}