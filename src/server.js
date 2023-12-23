const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

const corsOptions = {
	origin: '*', // replace with your frontend URL
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Allow credentials (e.g., tokens)
};

// Enable CORS for a specific origin
app.use(cors(corsOptions));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
	res.json({ msg: 'Welcome to the food store API....' })
);

// Routes
app.use('/api/user', require('../routes/user'));
app.use('/api/auth', require('../routes/auth'));
app.use('/api/products', require('../routes/products'));
app.use('/api/category', require('../routes/category'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
