const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { body, validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/user');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route     POST api/auth
// @desc     Auth user & get token
// @access    Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'invalid credentials' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'invalid credentials' });
			}

			const payload = {
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			};

			const signature = config.get('jwtSecret');

			jwt.sign(
				payload,
				signature,
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
