import passport from 'passport'
import getLogger from '../lib/log4js'
import * as util from '../util/_helper'
import jwt from 'jwt-simple'
import config from '../config/settings'

const logger = getLogger('controller-user')

export function findUsers(req, res, next) {
	passport.authenticate('bearer', (err, user, info) => {
		if (err) {
			logger.error(err)
			return res.json({
				status: 500,
				msg: err
			})
		}

		if (!user) {
			return res.json({
				status: 500,
				msg: 'Unauthorized user.'
			})
		}

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
	})(req, res, next)
}

export function login(req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			logger.error(err)
			return res.json({
				status: 500,
				msg: err
			})
		}

		if (!user && info) {
			return res.json({
				status: 500,
				msg: info.msg ? info.msg : info.message
			})
		}

		let tokenSecret = config[req.mode].token_secret
		let token = jwt.encode({
			id: user.id
		}, tokenSecret)

		user.token = token
		user.tokenCreated = new Date()

		user.save(err => {
			if (err) {
				logger.error(err)
				return res.json({
					status: 500,
					msg: err
				})
			}

			return res.json({
				status: 200,
				msg: 'Login success.',
				data: {
					user
				}
			})
		})
	})(req, res, next)
}

export function logout(req, res, next) {
	passport.authenticate('bearer', (err, user, info) => {
		if (err) {
			logger.error(err)
			return res.json({
				status: 500,
				msg: err
			})
		}

		if (!user) {
			return res.json({
				status: 500,
				msg: 'Unauthorized user'
			})
		}

		user.token = null
		user.tokenCreated = null

		user.save(err => {
			if (err) {
				logger.error(err)
				return res.json({
					status: 500,
					msg: err
				})
			}

			return res.json({
				status: 200,
				msg: 'Logout success.'
			})
		})
	})(req, res, next)
}

export function signUp(req, res, next) {
	let email = req.body.email
	let password = req.body.password
	let name = req.body.name
	let role = req.body.role

	if (!email) {
		return res.json({
			status: 500,
			msg: 'Invalid email.'
		})
	}

	if (!password) {
		return res.json({
			status: 500,
			msg: 'Invalid password.'
		})
	}

	if (!name) {
		return res.json({
			status: 500,
			msg: 'Invalid name.'
		})
	}

	if (role === null || role === undefined) {
		return res.json({
			status: 500,
			msg: 'Invalid role.'
		})
	}

	const User = req.models.user
	User.exists({
		email: email
	}, (err, isExist) => {
		if (err) {
			logger.error(err)
			return res.json({
				status: 500,
				msg: err
			})
		}

		if (isExist) {
			return res.json({
				status: 500,
				msg: 'The email is already used.'
			})
		}

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
	})
}