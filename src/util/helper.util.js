import path from 'path'
import callsite from 'callsite'
import fs from 'fs'
import bcrypt from 'bcrypt'

import getLogger from './_log4js'
import config from '../config/appConfig'

const logger = getLogger('helper')

export const listJSFiles = (dir, callback) => {
	fs.readdir(dir, (err, files) => {
		if (err) {
			return callback(err, null)
		}

		let jsFiles = []

		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			let filePath = path.join(dir, file)

			if (!fs.statSync(filePath).isFile()) {
				continue
			}

			if (path.extname(filePath) === '.js') {
				jsFiles.push(filePath)
			}
		}

		return callback(null, jsFiles)
	})
}

export const remoteDirname = (file_name) => {
	file_name = file_name || ''

	const stack = callsite()
	const requester = stack[2].getFileName()

	return path.join(path.dirname(requester), file_name)
}

export const encrypt = (req, password, callback) => {
	let mode = req.mode
	const saltRounds = config[mode].salt_round

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			logger.error(err)
			return callback(err)
		}

		return callback(null, hash)
	})
}

export const compare = (password, hash, callback) => {
	bcrypt.compare(password, hash, (err, res) => {
		if (err) {
			logger.error(err)
			return callback(err)
		}

		return callback(null, res)
	})
}

export const paging = (Model, page, perpage, callback) => {
	Model.count((err, count) => {
		if (err) {
			return callback(err)
		}

		const pages = getPages(count, perpage)

		if (page >= pages) {
			page = pages
		}

		if (page <= 0) {
			page = 1
		}

		const offset = getOffset

		return callback(null, offset, pages)
	})
}

export const getOffset = (page, perpage) => {
	const offset = (page - 1) * perpage
	return offset
}

export const getPages = (total, perpage) => {
	const pages = Math.ceil(total / perpage)
	return pages
}