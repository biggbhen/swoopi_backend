const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	userType: {
		type: String,
		default: 'customer',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// UserSchema.pre('save', async function (next) {
// 	if (!this.userId) {
// 		// Generate a new user ID starting from 1
// 		const lastUser = await this.constructor.findOne(
// 			{},
// 			{},
// 			{ sort: { userId: -1 } }
// 		);
// 		this.userId = lastUser ? lastUser.userId + 1 : 1;
// 	}
// 	next();
// });

const User = mongoose.model('user', UserSchema);
module.exports = User;
