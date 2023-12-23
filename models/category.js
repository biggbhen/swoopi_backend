const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true, // Ensures that each category has a unique name
	},
	description: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
