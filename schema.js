const mysql = require("mysql");
const faker = require("faker");

const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'sgabor',
    database: 'users_db'
});

connection.connect();

// Inserting statically user data to the database
const user = { email: faker.internet.email() };
let q = 'INSERT INTO users SET ?';
connection.query(q, user, function (error, results, fields) {
    if (error) throw error;
    console.log('New users:');
    console.log(user.email);
});


// Inserting dinamically users data to the database
const users = [];
for (let i = 0; i < 3; i++) {
  users.push([faker.internet.email(), faker.date.past()]);
}
q = 'INSERT INTO users(email, created_at) VALUES ?';
connection.query(q, [users], (err, res, fields) => {
  if (err) throw err;
  users.forEach((user) => {console.log(user[0])});
})

// get the number of users from the database
q = 'SELECT COUNT(*) as count FROM users';
connection.query(q, (err, res, fields) => {
  if (err) throw err;
  console.log('Users count: ', res[0].count);
})



connection.end();