export function getUsers(req, res, next) {
	const User = req.models.user;
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