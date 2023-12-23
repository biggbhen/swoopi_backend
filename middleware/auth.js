const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// Get Token From Header
	const token = req.header('Authorization');

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

		// const decoded = jwt.decode(req.token, { complete: true });
		console.log(req.token, config.get('jwtSecret'));

		const decoded = jwt.verify(req.token, config.get('jwtSecret'));
		// const decoded = jwt.verify(req.token, config.get('jwtSecret'), {
		// 	algorithms: ['HS256'],
		// });
		function verifyAccessToken(token) {
			const secret = config.get('jwtSecret');

			try {
				const decoded = jwt.verify(token, secret);
				return { success: true, data: decoded };
			} catch (error) {
				return { success: false, error: error.message };
			}
		}
		verifyAccessToken();

		req.user = decoded.user;
		next();
	} catch (error) {
		// console.error('Token verification error:', error.message, req.token);
		// console.log('Original token:', req.header('Authorization'));
		// console.log('Decoded token:', error.decoded);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
