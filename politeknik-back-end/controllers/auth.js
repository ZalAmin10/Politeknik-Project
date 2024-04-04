const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'User not exist' });
            return;
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ email: user.email }, 'secret_key');
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    });
});

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if email already exists
    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }
        // If email does not exist, create new user
        connection.query('INSERT INTO users (create_time, name, email, password, role, is_activated) VALUES (?, ?, ?, ?, ?, ?)', [currentTime, name, email, hashedPassword, role, 0], (error, results, fields) => {
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
