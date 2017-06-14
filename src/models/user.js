module.exports = function(orm, db) {
	const User = db.define('user', {
		id: {
			type: 'serial',
		},
		name: {
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
		created: {
			type: 'date'
		},
		modified: {
			type: 'date'
		},
		token: {
			type: 'text'
		},
		tokenCreated: {
			type: 'date',
			mapsTo: 'token_created'
		}
	}, {
		cache: false,
		timestamp: true
	})
}