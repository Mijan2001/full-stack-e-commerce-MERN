const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// middleware limit==================
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

// routes ====================
const authRoutes = require('./src/users/user.route');
app.use('/api/auth', authRoutes);

// connect to MongoDB================

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
