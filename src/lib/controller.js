import path from 'path'
import * as util from '../util/_helper'

export default function(controller_path, callback) {
	let controllers = {}

	util.listJSFiles(controller_path, (err, files) => {
		if (err) {
			return callback(err, null)
		}

		for (var i = 0; i < files.length; i++) {
			let controller = path.basename(files[i], '.js')
			controllers[controller] = require(files[i])
		}

		callback(null, controllers)
	})
}