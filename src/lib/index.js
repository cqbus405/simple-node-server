import express from 'express'
import orm from 'orm'
import {
	createServer
} from 'http'

import * as util from '../util/_helper'
import model from './model'
import controller from './controller'

import settings from '../config/settings'
import hook_router from '../config/router'
import hook_express from '../config/express'
import hook_orm from '../config/orm'

export default function(opt, callback) {
	if (arguments.length === 1) {
		callback = opt;
		opt = {};
	}

	let app, setting, mode, path, server;

	path = opt.path || util.remoteDirname();
	mode = opt.mode || process.env.NODE_ENV || 'development';

	app = express()

	if (!settings[mode]) {
		return callback('Fail to load models', null)
	}
	setting = settings[mode]

	app.use(function(req, res, next) {
		req.setting = setting
		req.mode = mode
		next()
	})

	model(app, {
		setting: setting,
		hook: hook_orm,
		path: `${path}/model`,
		orm: orm,
		mode: mode
	}, (err, result) => {
		if (err) {
			return callback(err, null)
		}

		hook_express(app, express)

		//routes
		controller(path + '/controller', function(err, controllers) {
			if (err) {
				return callback(err, null)
			}

			hook_router(app, controllers)

			const server = createServer(app);
			server.listen(setting.port, () => {
				callback(null, {
					port: setting.port,
					mode: mode
				})
			})
		})
	})
}