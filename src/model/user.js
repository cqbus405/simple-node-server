module.exports = function(orm, db) {
	const User = db.define('user', {
		id: {
			type: 'serial',
		},
		firstname: {
			type: 'text'
		},
		lastname: {
			type: 'text'
		},
		email: {
			type: 'text'
		},
		password: {
			type: 'text'
		},
		role: {
			type: 'integer'
		},
		createdAt: {
			type: 'date'
		},
		modifiedAt: {
			type: 'date'
		},
	}, {
		cache: false,
		timestamp: true
	})
}