const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const Product = require('../models/product');
const { upload } = require('../middleware/upload');
const cloudinary = require('../middleware/cloudinary');
const Category = require('../models/category');

// @route     POST api/products
// @desc     Add new product
// @access    Private
router.post('/', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// console.log(req.files.productImage);
	try {
		if (!req.files.productImage || !req.body) {
			return res.status(400).json({ error: 'No Image File found.' });
		}

		const imgpath = req.files.productImage;
		const cloudinaryResult = await cloudinary.uploader.upload(imgpath.path, {
			folder: 'swoopi',
		});

		const {
			name,
			description,
			date,
			ingredients,
			salesPrice,
			defaultPrice,
			foodCategory,
			requiredOptions,
		} = req.body;

		// Find the category by name
		const foundCategory = await Category.findOne({ name: foodCategory });

		if (!foundCategory) {
			return res.status(404).json({ error: 'Category not found' });
		}

		const newProduct = new Product({
			name,
			ingredients,
			category: {
				id: foundCategory._id,
				name: foundCategory.name,
			},
			defaultPrice,
			salesPrice,
			requiredOptions,
			description,
			productImage: cloudinaryResult.secure_url, // Store the image path if an image is uploaded
			date,
		});

		const product = await newProduct.save();
		res.status(200).json(product);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

// @route     GET api/products
// @desc      Get all users products
// @access    Private
router.get('/:categoryName?', auth, async (req, res) => {
	try {
		let query = {};
		// Check if a category parameter is provided
		if (req.params.categoryName) {
			const categoryName = req.params.categoryName;

			// Find the category by name
			const category = await Category.findOne({ name: categoryName });

			if (!category) {
				return res.status(404).json({ error: 'Category not found' });
			}

			// Set the query to filter products by category
			query = { 'category.name': categoryName };
		}
		const products = await Product.find(query).sort({
			date: -1,
		});
		res.json(products);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
