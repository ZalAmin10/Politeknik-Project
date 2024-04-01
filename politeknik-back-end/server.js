const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost', // Change this to your MySQL host if it's not running locally
    user: 'root', // Change this to your MySQL username
    password: 'root', // Change this to your MySQL password
    database: 'politeknik',
    port: 3306 // Default MySQL port is 3306
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define routes
app.get('/users', (req, res) => {
    // Perform a sample query to the user table
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ users: results }); // Assuming the query was successful, return the results
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
