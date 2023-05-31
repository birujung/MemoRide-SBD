//import packages
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
 
//initialize the app as an express app
const app = express();
const router = express.Router();
const { Client } = require('pg');
const bcrypt = require('bcrypt');

//Insiasi koneksi ke database
const db = new Client({
    connectionString : '@ep-cold-band-487702.ap-southeast-1.aws.neon.tech',
    sslmode: "require",
    ssl: true
});

//Melakukan koneksi dan menunjukkan indikasi database terhubung
db.connect((err)=>{
    if(err){
        console.log(err)
        return
    }

    //jalankan koneksi ke database
    console.log('Connected to Database')
});

 
//middleware (session)
app.use(
    session({
        secret: 'ini contoh secret',
        saveUninitialized: false,
        resave: false
    })
);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

var temp;
 
//ROUTERS
 
//Router 1: Menampilkan landing page (login/register)
router.get('/', (req, res) => {
    temp = req.session;
    if (temp.username && temp.visits) { //jika user terdaftar maka akan masuk ke halaman admin
        return res.redirect('/admin');
    } else { //login / register page
        temp.visits = 1;
        res.end(
            `<html>
                <head>
                    <title>Modul 9 - SBD</title>
                </head>
                <body style="background-color: F8CB2E; text-align: center;">
                    <h1> Pusat Data GamingNetlab </h1>
                    <h2> Login </h2>
                    Username:
                    <input type="text" id="username" /><br />
                    Password :
                    <input type="password" id="password" /><br />
                    <input type="button" value="Submit" id="submits" />

                    <h2> Register </h2>
                    Username:
                    <input type="text" id="usernames" /><br />
                    Password :
                    <input type="password" id="passwords" /><br />
                    <input type="button" value="Submit" id="register" />
                    <h3> Modul 9 SBD </h3>
                </body>
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <script>
                    jQuery(document).ready(function($) {
                        var username, pass;
                        $('#submits').click(function() {
                            username = $('#username').val();
                            pass = $('#password').val();
                            
                            $.post('/login', { username: username, pass: pass }, function(data) {
                                if (data === 'done') {
                                    window.location.href = '/admin';
                                    window.alert('Login Sukses');
                                }
                                else if (data === 'fail'){
                                    window.alert('Login Gagal');
                                }
                            });
                        });
                        $('#register').click(function() {
                            username = $('#usernames').val();
                            pass = $('#passwords').val();
                            
                            $.post('/register', { username: username, pass: pass }, function(data) {
                                if (data === 'done') {
                                    window.location.href = '/admin';
                                    window.alert('Registrasi Sukses');
                                }
                            });
                        });
                    });
                </script>
            </html>`
        );
    }
});
 
// Router 2: Melakukan Login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    // Mengecek informasi yang dimasukkan user apakah terdaftar pada database
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Terjadi kesalahan pada server.');
        } else {
            if (results.length === 0) {
                res.status(401).send('Username atau password salah.');
            } else {
                const user = results[0];
                if (password === user.password) {
                    // Login berhasil, menyimpan informasi user pada session
                    req.session.username = user.username;
                    req.session.userId = user.id;
                    res.send('Login berhasil.');
                } else {
                    res.status(401).send('Username atau password salah.');
                }
            }
        }
    });
});

// Router 3: Melakukan Register Akun
router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Melakukan registrasi user baru ke dalam database
    const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Terjadi kesalahan pada server.');
        } else {
            res.send('Registrasi berhasil.');
        }
    });
});


//router 4: melakukan delete data dari database
router.post('/delete', (req, res) => {
    const query = "";  // query hapus data
    //menghapus data_gaming berdasarkan id
    db.query(query, (err, results) => {
       //tambahkan konfigurasi delete di sini
    });
    
    res.end('done');
});

//router 5: melakukan pemngambilan data dari database
router.post('/getdata', (req, res) => {
    const query = "SELECT * FROM Wisata"; // query ambil data
    //mendapatkan data dari database
    db.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query', err.stack);
          return res.send([]);
        }
    
        const data = results.rows;
        return res.send(data);
      });
    });
  

 
// Router 6: merupakan tampilan data ketika login berhasil dilakukan
router.get('/admin', (req, res) => {
    temp = req.session;
    if (temp.username) {
        res.write(`<html>
        <head>
            <title>Modul 9 - SBD</title>
        </head>
        <body style="background-color: F8CB2E; text-align: center;">`);
        
        //tambahkan welcoming beserta username
        
        res.write(
        `<a> Jumlah kunjungan ${temp.visits}</a>
        <h5>Refresh page to increase visits</h5>
        `
        );
        temp.visits++;
        res.write( // table header
           `<table id=data_gaming>
                <tr>
                    <th>ID</th>
                    <th>Nama Game</th>
                    <th>Jumlah Game</th>
                </tr>`
        );  
        res.end(`</table></body>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script>
        alert("berhasil masuk");
            // Isi konfigurasi delete disini


            jQuery(document).ready(function($) {
                $.post('/getdata', { }, function(data) {
                    console.log(data);
                    //melakukan pemanggilan data disini
                });
            });
            </script>
        </html>`);
        console.log('Data Fetch successful');
        res.write('<a href=' + '/logout' + '>Click here to log out</a>');
    } 
    else {
        res.write('<h1>You need to log in before you can see this page.</h1>');
        res.end('<a href=' + '/' + '>Login</a>');
    }
});
 
//Router 7: mengheapus session
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});
 
app.use('/', router);
app.listen(process.env.PORT || 6216, () => {
    console.log(`App Started on PORT ${process.env.PORT || 6216}`);
});