const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	ingredients: { type: String, required: true },
	description: { type: String, required: true },
	category: {
		id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
		name: String,
	},
	salesPrice: { type: Number },
	defaultPrice: { type: Number, required: true },
	requiredOptions: [{ name: String, isSingleChoice: Boolean }],
	productImage: { type: String, required: true },
	date: {
		type: Date,
		default: Date.now,
	},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
