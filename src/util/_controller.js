import path from 'path'
import * as util from './helper'

export default (controller_path, callback) => {
	let controllers = {}

	util.listJSFiles(controller_path, (err, files) => {
		if (err) {
			return callback(err, null)
		}

		for (var i = 0; i < files.length; i++) {
			let controller = path.basename(files[i], '.js')
			const file = files[i].replace('lib', '..')
			controllers[controller] = require(file)
		}

		return callback(null, controllers)
	})
}