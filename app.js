const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");
const bodyParser = require("body-parser");
// const faker = require("faker");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'sgabor',
    database: 'users_db'
});


app.get('/', (req, res) => {
    const q = 'SELECT COUNT(*) AS count FROM users';
    // connection.connect();
    connection.query(q, (err, results, fields) => {
        if (err) throw err;
        const count = results[0].count;
        res.render('home', {count: count});
    })
    // connection.end(); // if I close the connection I have to restart the server every time I make changes to db!
});

app.post('/register', (req, res) => {
    const email = req.body.email
    const user = {
        email: email
    }
    connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
      if (error) throw error;
      console.log('Thanks for joining: ', email);
    //   res.send('<h1>Thanks for signing up!</h1>');
      res.redirect("/");
    });
});


app.get('/joke', (req, res) => {
    res.send('What do you call a dog that does magic tricks?<br/>It\'s a...<br/>Labracadabrador!');
});


app.get('/random_number', (req, res) => {
    const random_number = Math.floor(Math.random() * 1000);
    res.send('Your random number is: ' + random_number);
})

app.listen(8080, () => {
    console.log('Server running on port 8080.');
})