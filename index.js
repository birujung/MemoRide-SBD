//import packages
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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

// Create a booking
router.post('/booking', async (req, res) => {
    try {
        const { userId, username, namaLengkap, jumlahOrang, noTelepon, bookingDate } = req.body;

        const query = 'INSERT INTO booking (user_id, username, nama_lengkap, jumlah_orang, no_telepon, booking_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
        const values = [userId, username, namaLengkap, jumlahOrang, noTelepon, bookingDate];

        const result = await db.query(query, values);
        const newBooking = result.rows[0];

        return res.json(newBooking);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Create booking failed' });
    }
});

// Get all bookings
router.get('/booking', async (req, res) => {
    try {
        const query = 'SELECT * FROM booking;';
        const result = await db.query(query);
        const bookings = result.rows;

        return res.json(bookings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Retrieve bookings failed' });
    }
});

// Get a specific booking by user ID
router.get('/booking/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const query = 'SELECT * FROM booking WHERE user_id = $1;';
        const values = [userId];

        const result = await db.query(query, values);
        const booking = result.rows[0];

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.json(booking);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Retrieve booking failed' });
    }
});

// Update a specific booking by user ID
router.put('/booking/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, namaLengkap, jumlahOrang, noTelepon, bookingDate } = req.body;

        const query = 'UPDATE booking SET username = $2, nama_lengkap = $3, jumlah_orang = $4, no_telepon = $5, booking_date = $6 WHERE user_id = $1 RETURNING *;';
        const values = [userId, username, namaLengkap, jumlahOrang, noTelepon, bookingDate];

        const result = await db.query(query, values);
        const updatedBooking = result.rows[0];

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.json(updatedBooking);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Update booking failed' });
    }
});

// Delete a specific booking by user ID
router.delete('/booking/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const query = 'DELETE FROM booking WHERE user_id = $1 RETURNING *;';
        const values = [userId];

        const result = await db.query(query, values);
        const deletedBooking = result.rows[0];

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.json({ message: 'Booking deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Delete booking failed' });
    }
});

// Create a review
router.post('/review', async (req, res) => {
    try {
        const { wisataId, username, textReview, rating } = req.body;

        const query = 'INSERT INTO review (wisata_id, username, text_review, rating) VALUES ($1, $2, $3, $4) RETURNING *;';
        const values = [wisataId, username, textReview, rating];

        const result = await db.query(query, values);
        const newReview = result.rows[0];

        return res.json(newReview);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Create review failed' });
    }
});

// Get all reviews
router.get('/review', async (req, res) => {
    try {
        const query = 'SELECT * FROM review;';
        const result = await db.query(query);
        const reviews = result.rows;

        return res.json(reviews);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Retrieve reviews failed' });
    }
});

// Get reviews for a specific wisata by ID
router.get('/review/:wisataId', async (req, res) => {
    try {
        const { wisataId } = req.params;

        const query = 'SELECT * FROM review WHERE wisata_id = $1;';
        const values = [wisataId];

        const result = await db.query(query, values);
        const reviews = result.rows;

        return res.json(reviews);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Retrieve reviews failed' });
    }
});

// Update a specific review by wisata ID and username
router.put('/review/:wisataId/:username', async (req, res) => {
    try {
        const { wisataId, username } = req.params;
        const { textReview, rating } = req.body;

        const query = 'UPDATE review SET text_review = $3, rating = $4 WHERE wisata_id = $1 AND username = $2 RETURNING *;';
        const values = [wisataId, username, textReview, rating];

        const result = await db.query(query, values);
        const updatedReview = result.rows[0];

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.json(updatedReview);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Update review failed' });
    }
});

// Delete a specific review by wisata ID and username
router.delete('/review/:wisataId/:username', async (req, res) => {
    try {
        const { wisataId, username } = req.params;

        const query = 'DELETE FROM review WHERE wisata_id = $1 AND username = $2 RETURNING *;';
        const values = [wisataId, username];

        const result = await db.query(query, values);
        const deletedReview = result.rows[0];

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.json({ message: 'Review deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Delete review failed' });
    }
});

