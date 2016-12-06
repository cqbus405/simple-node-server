import passport from 'passport'
import getLogger from '../lib/log4js'
import * as util from '../util/_helper'

const logger = getLogger('controller-user')

export function getUsers(req, res, next) {
	const User = req.models.user

	User.all((err, users) => {
		if (err) {
			return res.json({
				status: 500,
				msg: err
			})
		}

		return res.json({
			status: 200,
			data: users
		})
	})
}

export function login(req, res, next) {
	return res.json({
		status: 200,
		msg: 'Login success',
		data: {
			token: req.user.email
		}
	})
}

export function signUp(req, res, next) {
	let email = req.body.email
	let password = req.body.password
	let name = req.body.name
	let role = req.body.role

	util.checkInput(email, 'email', res)
	util.checkInput(password, 'password', res)
	util.checkInput(name, 'name', res)
	util.checkInput(role, 'role', res)

	util.encrypt(req, password, (err, hash) => {
		if (err) {
			logger.error(err)
			return res.json({
				status: 500,
				msg: err
			})
		}

		let encryptedPwd = hash
		let created = new Date()

		let newUser = {
			email: email,
			password: encryptedPwd,
			name: name,
			role: role,
			created: created
		}

		let User = req.models.user

		User.create(newUser, (err, user) => {
			if (err) {
				logger.error(err)
				return res.json({
					status: 500,
					msg: err
				})
			}

			return res.json({
				status: 200,
				msg: 'Sign up success.',
				data: user
			})
		})
	})
}