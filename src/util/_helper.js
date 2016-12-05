import path from 'path'
import callsite from 'callsite'
import fs from 'fs'
import bcrypt from 'bcrypt'
import getLogger from '../lib/log4js'

const logger = getLogger('helper')

export function listJSFiles(dir, callback) {
	fs.readdir(dir, (err, files) => {
		if (err) {
			logger.error(err)
			return callback(err, null)
		}

		let js_files = []

		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			let file_path = path.join(dir, file)

			if (!fs.statSync(file_path).isFile()) continue

			if (path.extname(file_path) === '.js') js_files.push(file_path)
		}

		callback(null, js_files)
	})
}

export function remoteDirname(file_name) {
	file_name = file_name || ''

	const stack = callsite()
	const requester = stack[2].getFileName()

	return path.join(path.dirname(requester), file_name)
}

export function encrypt(password, saltRounds, User, callback) {
	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			logger.error(err)
			return callback(err)
		}

		return callback(null, hash)
	})
}

export function compare(password, hash, callback) {
	bcrypt.compare(password, hash, (err, res) => {
		if (err) {
			logger.error(err)
			return callback(err)
		}

		return callback(null, res)
	})
}