import path from 'path'
import * as util from '../util/helper.util'

export default modelsPath => {
  let models = {}
  let files = util.listJSFiles(modelsPath)
  files.forEach(function(file) {
    let fileWithBasename = path.basename(file, '.js')
    let fileWithPath = path.join(__dirname, '../models/' + fileWithBasename);
    models[fileWithBasename] = require(fileWithPath)
  })
  return models
}