let mysql = require('mysql')
let Promise = require('promise')

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Priya@123',
    database : 'courses'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("mysql connected");
});

module.exports = db;
};