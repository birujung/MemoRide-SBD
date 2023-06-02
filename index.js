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

const port = 3000;



// Create a PostgreSQL connection pool
const db = new Client({
    user: 'akmal.rabbani',
    host: 'ep-cold-band-487702.ap-southeast-1.aws.neon.tech',
    database: 'MemoRide',
    password: 'uYJrI2KP9swx',
    port: 6123,
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
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
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
