//npm install express cors mysql2 dotenv
// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS for all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// MySQL connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Authentication endpoint
app.post('/api/auth', async (req, res) => {
    const { email, password, type } = req.body;

    if (type === 'login') {
        db.execute('SELECT * FROM clients WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'User not found' });
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    } else if (type === 'register') {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.execute('INSERT INTO clients (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({ message: 'Registration successful' });
        });
    } else {
        res.status(400).json({ error: 'Invalid request type' });
    }
});

app.post('/emessage', (req, res) => {
    const requestData = req.body;
    //show response as motivation
    res.json({
        message: 'Data received successfully!',
        receivedData: requestData
    })

})

// Sample route to handle JSON requests
app.post('/api/data', (req, res) => {
    const requestData = req.body;
    const { client_name,email,service, amount, message } = req.body;
    console.log('Received data:', requestData);

    const query = 'INSERT INTO orders (client_name,email,service, amount, message) VALUES (?, ?, ?)';
    db.execute(query, [client_name,email,service, amount, message], (err, results) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).json({ error: 'Failed to insert data into database' });
        }
        // Respond with some JSON data
        const responseData = {
        message: 'Data received successfully!',
        receivedData: requestData,
        'redirect':True,
        'info':'order_made'
    };
    res.json(responseData);
    });

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
