const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ username: user.username }, 'secret_key');
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10
    // Check if username already exists
    connection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }
        // If username does not exist, create new user
        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results, fields) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'User registered successfully' });
        });
    });
});

module.exports = router;
