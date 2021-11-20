const express = require('express');
const app = express();
const newConn = require('./DBConnection'); // Import the connection details

/*
app.get('/', (req, res) => {
    res.send('<h1> Hello Express World!</h1>');
});

app.get('/About',(req, res) => {
    res.send('<h1>The About Page</h1>')
})

app.get('/sign-up', (req, res) => {
    // Adding name to a list
    res.send(req.query.name + ' was added to the list')
});

app.get('/show-query', (req, res) => {
    res.send(req.query);
})
*/

// Add a booking
app.get('/add-booking', (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    //Retrieve value from the input and insert them into the table
    conn.query(`insert into Bookings values ('${req.query.desc}')`, (err, rows, fields) => {});

    conn.end(); // End the connection
})

// Creates the routing needed to serve the static files (can now load the files that are in the public directory)
app.use(express.static('static'))

// Dynamic handling
app.get()

app.listen(1500);