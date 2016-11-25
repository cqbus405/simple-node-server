module.exports = function(orm, db) {
	const User = db.define('user', {
		id: {
			type: 'integer'
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
		hooks: {
			beforeCreate: function() {
				this.createdAt = new Date()
			}
		}
	})
}