const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const Product = require('../models/product');

// @route     POST api/products
// @desc     Add new product
// @access    Private
router.post(
	'/',
	[auth, [check('name', 'Name is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, ingredients, category, price, requiredOptions, date } =
			req.body;

		try {
			const newProduct = new Product({
				name,
				ingredients,
				category,
				price,
				requiredOptions,
				user: req.user.id,
				date,
			});

			const product = await newProduct.save();
			res.json(product);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route     GET api/products
// @desc      Get all users products
// @access    Private
router.get('/', auth, async (req, res) => {
	try {
		const products = await Product.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(products);
	} catch (error) {
		// console.error(errr.message)
		res.status(500).send('Server error');
	}
});

module.exports = router;
