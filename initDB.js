const mysql = require('mysql');
const newConn = require('./DBConnection'); // Import the connection details

let conn = newConn(); // Create the connection
conn.connect(); // Establish the connection

// Drop the table if it already exists
conn.query(`Drop Table Bookings`,
            (err) => {
                // If errors are found, display the error, otherwise display that the table was dropped successfully
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('Table dropped');
                }
            }
)

// Create a table
conn.query(`CREATE TABLE Bookings 
            (
                guestName varchar(100), 
                timeslot1 tinyint, 
                timeslot2 tinyint, 
                timeslot3 tinyint, 
                timeslot4 tinyint, 
                timeslot5 tinyint, 
                timeslot6 tinyint, 
                timeslot7 tinyint, 
                timeslot8 tinyint, 
                timeslot9 tinyint, 
                timeslot10 tinyint
            )`,
            (err) => {
                // If errors are found in the table, display the error, otherwise display that the table was created successfully
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('Table created');
                }
            }
)

// Insert a row of values into the table
conn.query(`insert into Bookings values 
            (
                'Example',
                true,
                false,
                true,
                false,
                true,
                true,
                false,
                false,
                false,
                false
            )`,
            (err) => {
                // If errors are found in the table, display the error, otherwise display that the data was inserted successfully
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('Row inserted');
                }
            }
)

// Display all rows in the table
conn.query(`select * from Bookings`,
            (err, rows, fields) => {
                // If errors are found in the table, display the error, otherwise display that the rows were selected successfully
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('Row inserted');
                }

                for(r of rows) {
                    console.log(r)
                }
            }
)

conn.end(); // End the connection