const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const Category = require('../models/category');

// @route     POST api/category
// @desc     Add new product category
// @access    Private
router.post(
	'/',
	[auth, [check('name', 'Name is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, description, date } = req.body;

		try {
			const newCategory = new Category({
				name,
				description,
				date,
				user: req.user.id,
			});

			const category = await newCategory.save();
			res.json(category);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route     GET api/categories
// @desc      Get all users categories
// @access    Private
router.get('/', auth, async (req, res) => {
	try {
		const categories = await Category.find({ user: req.user.id });
		res.json(categories);
	} catch (error) {
		// console.error(errr.message)
		res.status(500).send('Server error');
	}
});

module.exports = router;
