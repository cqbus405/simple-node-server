import path from 'path'
import * as util from '../util/helper.util'

export default controllerPath => {
	let routes = {}
	let files = util.listJSFiles(controllerPath)
	files.forEach(function(file) {
		let fileWithBasename = path.basename(file, '.js')
		let fileWithPath = path.join(__dirname, '../routes/' + fileWithBasename);
		routes[fileWithBasename] = require(fileWithPath)
	})
	return routes
}