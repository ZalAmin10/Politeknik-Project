const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const authRoutes = require('./controllers/auth');
const userRoutes = require('./controllers/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection configuration
global.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'politeknik',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Use authentication routes
app.use('/', authRoutes);

// Use user routes
app.use('/', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
