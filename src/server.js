const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formData = require('express-form-data');

const app = express();

// Connect Database
connectDB();

const corsOptions = {
	origin: [
		'http://localhost:3000',
		'http://localhost:3002',
		'https://client-plum-psi.vercel.app',
		'https://admin-wheat-phi.vercel.app',
	], // replace with your frontend URL
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Allow credentials (e.g., tokens)
};

// Init Middleware
app.use(express.json({ extended: false }));
// Enable CORS for a specific origin
app.use(cors(corsOptions));
//Configuring cookie-parser
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products/', express.static('../uploads'));
// express formData()
app.use(formData.parse());

app.get('/', (req, res) =>
	res.json({ msg: 'Welcome to the food store API....' })
);

// Routes
app.use('/api/user', require('../routes/user'));
app.use('/api/auth', require('../routes/auth'));
app.use('/api/products', require('../routes/products'));
app.use('/api/category', require('../routes/category'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
