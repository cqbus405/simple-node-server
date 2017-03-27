import path from 'path'
import * as util from './helper'

export default function(app, opt, callback) {
	const orm = opt.orm

	orm.connect(opt.setting.mysql, (err, db) => {
		if (err) {
			return callback(err, null)
		}

		opt.hook(orm, db)

		util.listJSFiles(opt.path, (err, files) => {
			if (err) {
				return callback(err, null)
			}

			for (let i = 0; i < files.length; i++) {
				const file = files[i].replace('lib', '..')
				require(file)(orm, db) // register each model
			}

			app.use(function(req, res, next) {
				req.db = db;
				req.models = db.models
				return next()
			})

			db.sync(function(err) {
				if (err) {
					return callback(err, null)
				}

				callback(null, 'connected to mysql successfully', db.models.user)
			})
		})
	})
}