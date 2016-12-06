import passport from 'passport'
import getLogger from '../lib/log4js'
import * as util from '../util/_helper'
import jwt from 'jwt-simple'
import config from '../config/settings'

const logger = getLogger('controller-user')

export function findUsers(req, res, next) {
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
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			logger.error(err)
			return res.json({
				status: 500,
				msg: err
			})
		}

		if (info) {
			return res.json({
				status: 500,
				msg: info.msg
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
					token: token
				}
			})
		})
	})(req, res, next)
}

export function signUp(req, res, next) {
	let email = req.body.email
	let password = req.body.password
	let name = req.body.name
	let role = req.body.role

	logger.debug('===> body: ' + JSON.stringify(req.body) + '\n')

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