const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');
	// Check if not Token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied.' });
	}
	try {
		if (token.startsWith('Bearer ')) {
			const newToken = token.substring(7); // Remove 'Bearer ' prefix
			req.token = newToken;
		} else {
			req.token = token;
		}

		const decoded = jwt.verify(
			req.token.toString(),
			config.get('jwtSecret').toString()
		);

		req.user = decoded.user;

		next();
	} catch (error) {
		// console.error('Token verification error:', error.message, req.token);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
