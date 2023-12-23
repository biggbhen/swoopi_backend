const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	ingredients: { type: String, required: true },
	description: { type: String, default: 'A delicacy' },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category', // Reference to the Category model
		required: true,
	},
	price: { type: Number, required: true },
	requiredOptions: [
		{
			sie: {
				type: String,
				required: true,
			},
			toppings: {
				type: Boolean,
				default: false,
			},
		},
	],
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
