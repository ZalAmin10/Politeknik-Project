const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    // Perform a sample query to the user table
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ users: results });
    });
});

module.exports = router;
