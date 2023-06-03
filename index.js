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

