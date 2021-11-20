const mysql = require('mysql');

// Create the connection object (function ensures that it is reusable)
function newConnection() {
    let conn = mysql.createConnection({
        host:'35.202.169.0',
        user:'root',
        password:'root',
        database:'usersDB'
    });

    return conn;
}

module.exports = newConnection; // Allows other files to use this connection