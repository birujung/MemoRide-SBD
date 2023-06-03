//import packages
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
//const paypal = require('paypal-rest-sdk');
const bcrypt = require('bcrypt');
//const axios = require('axios');
//const multer = require('multer');
const fs = require('fs');

//initialize the app as an express app
const app = express();
const router = express.Router();
const { Client } = require('pg');

const port = 6123;



// Create a PostgreSQL connection pool
const db = new Client({
    user: 'akmal.rabbani',
    host: 'ep-cold-band-487702.ap-southeast-1.aws.neon.tech',
    database: 'MemoRide',
    password: 'uYJrI2KP9swx',
    port: 5432,
    ssl:{rejectUnauthorized: false}, 
  });


//koneksi ke database
db.connect((err)=>{
    if (err) {
        console.log(err);
        return;
    }
    console.log("Database connected.");
});

//middleware (session)
app.use(
    session({
        secret: 'ini contoh secret',
        saveUninitialized: true,
        resave: false,
    })
);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

var store_session;
 
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// ROUTERS
// Landing page
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM wisata;';
        const values = [];
        
        const result = await db.query(query, values);
        const wisata = result.rows;

        return res.json(wisata);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Retrieve data failed.' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if the username is already taken
        const query = 'SELECT * FROM users WHERE username = $1;';
        const values = [username];
        const result = await db.query(query, values);
        const existingUser = result.rows[0];
        
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert the new user into the database
        const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2);';
        const insertValues = [username, hashedPassword];
        await db.query(insertQuery, insertValues);
        
        return res.json({ message: 'Registration successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Registration failed' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Retrieve the user from the database based on the username
        const query = 'SELECT * FROM users WHERE username = $1;';
        const values = [username];
        const result = await db.query(query, values);
        const user = result.rows[0];
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        // Store user data in the session
        req.session.user = {
            id: user.id,
            username: user.username
        };
        
        return res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login failed' });
    }
});
