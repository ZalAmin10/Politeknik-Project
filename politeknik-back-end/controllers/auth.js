const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({ username: user.username }, 'secret_key');
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

module.exports = router;
