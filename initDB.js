const mysql = require('mysql');
const newConn = require('./DBConnection'); // Import the connection details

let conn = newConnection(); // Create the connection
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
                Description varchar(100)
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
conn.query(`insert into Bookings values ("Table")`,
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