import passport from 'passport'
import getLogger from '../lib/log4js'

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