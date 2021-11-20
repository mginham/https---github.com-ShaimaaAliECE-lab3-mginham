const express = require('express');
const app = express();
const newConn = require('./DBConnection'); // Import the connection details

// Creates the routing needed to serve the static files (can now load the files that are in the public directory)
app.use(express.static('static'))

// Dynamic handling //

// Add guest availability
app.get("/add-availability", (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    //If not available, mark false
    if (req.query.timeslot1 != 1) {
        req.query.timeslot1 = 0;
    }
    if (req.query.timeslot2 != 1) {
        req.query.timeslot2 = 0;
    }
    if (req.query.timeslot3 != 1) {
        req.query.timeslot3 = 0;
    }
    if (req.query.timeslot4 != 1) {
        req.query.timeslot4 = 0;
    }
    if (req.query.timeslot5 != 1) {
        req.query.timeslot5 = 0;
    }
    if (req.query.timeslot6 != 1) {
        req.query.timeslot6 = 0;
    }
    if (req.query.timeslot7 != 1) {
        req.query.timeslot7 = 0;
    }
    if (req.query.timeslot8 != 1) {
        req.query.timeslot8 = 0;
    }
    if (req.query.timeslot9 != 1) {
        req.query.timeslot9 = 0;
    }
    if (req.query.timeslot10 != 1) {
        req.query.timeslot10 = 0;
    }

    // Insert the availablity into the table
    conn.query(`INSERT INTO Availability values
                (
                    '${req.query.guestName}',
                    '${req.query.timeslot1}',
                    '${req.query.timeslot2}',
                    '${req.query.timeslot3}',
                    '${req.query.timeslot4}',
                    '${req.query.timeslot5}',
                    '${req.query.timeslot6}',
                    '${req.query.timeslot7}',
                    '${req.query.timeslot8}',
                    '${req.query.timeslot9}',
                    '${req.query.timeslot10}'
                )`, 
        (err, rows, fields) => {
            // If errors are found in the table, display the error, otherwise display that the data was inserted successfully
            if(err) {
                console.log(err);
            }
            else {
                console.log('Row inserted');
            }
            
            // Navigate back to the calendar 
            res.redirect('/calendar');
        }
    );

    conn.end(); // End the connection
})

// Edit the timeslots
app.get("/edit-timeslots", (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection
    
    conn.query(`ALTER TABLE Availability change timeslot1 '${req.query.timeslot1} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot2 '${req.query.timeslot2} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot3 '${req.query.timeslot3} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot4 '${req.query.timeslot4} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot5 '${req.query.timeslot5} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot6 '${req.query.timeslot6} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot7 '${req.query.timeslot7} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot8 '${req.query.timeslot8} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot9 '${req.query.timeslot9} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot10 '${req.query.timeslot10} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.query(`ALTER TABLE Availability change timeslot2 '${req.query.timeslot2} tinytint)`, 
        (err, rows, fields) => {
            res.redirect('/admin');
        }
    );

    conn.end(); // End the connection
})

app.get("/admin", (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    let text = `<form action='/edit-timeslots'>
    <h2> Please Insert the Available Availability (10 minute slots)<h2>
    <h4> Available Availability should not be changed after user data is submitted <h4>
    <input name='timeslot1', placeholder="HH:MM"/>
    <input name='timeslot2', placeholder="HH:MM"/>
    <input name='timeslot3', placeholder="HH:MM"/>
    <input name='timeslot4', placeholder="HH:MM"/>
    <input name='timeslot5', placeholder="HH:MM"/>
    <input name='timeslot6', placeholder="HH:MM"/>
    <input name='timeslot7', placeholder="HH:MM"/>
    <input name='timeslot8', placeholder="HH:MM"/>
    <input name='timeslot9', placeholder="HH:MM"/>
    <input name='timeslot10', placeholder="HH:MM"/>
    <input type="submit" value="Submit">

    <h2>Guest View:</h2>
    <a href='/calendar'>See Calendar</a>`

    res.send(text);

    conn.end(); // End the connection
})

app.get('/calendar', (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    let text = ``;
    let timeslots;

    conn.query('SELECT * FROM Availability', 
        (err, rows, fields) => {
            timeslots = rows;

            text += 
                `<table>   
                    <tr>
                        <th>guestName</th>
                        <th>Timeslot 1</th>
                        <th>Timeslot 2</th>
                        <th>Timeslot 3</th>
                        <th>Timeslot 4</th>
                        <th>Timeslot 5</th>
                        <th>Timeslot 6</th>
                        <th>Timeslot 7</th>
                        <th>Timeslot 8</th>
                        <th>Timeslot 9</th>
                        <th>Timeslot 10</th>
                    </tr>
                    <tr>
                    <form action='/add-availability'>
                    <td><input name='guestName'/></td>
                    <td><input name='timeslot1', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot2', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot3', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot4', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot5', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot6', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot7', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot8', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot9', type="checkbox", value = "1" /></td>
                    <td><input name='timeslot10', type="checkbox", value = "1" /></td>
                    <td><input type="submit" value="Submit"></td>
                    </tr>
                    `;

            for (p of timeslots) {
                text += '<tr>';
                text += '<td>';
                text += p.guestName;
                text += '</td>';
                text += '<td>';
                text += p.timeslot1;
                text += '</td>';
                text += '<td>';
                text += p.timeslot2;
                text += '</td>';
                text += '<td>';
                text += p.timeslot3;
                text += '</td>';
                text += '<td>';
                text += p.timeslot4;
                text += '</td>';
                text += '<td>';
                text += p.timeslot5;
                text += '</td>';
                text += '<td>';
                text += p.timeslot6;
                text += '</td>';
                text += '<td>';
                text += p.timeslot7;
                text += '</td>';
                text += '<td>';
                text += p.timeslot8;
                text += '</td>';
                text += '<td>';
                text += p.timeslot9;
                text += '</td>';
                text += '<td>';
                text += p.timeslot10;
                text += '</td>';
                text += '</tr>';
                
            }
            text += '</table>';
            res.send(text);
        })

    conn.end(); // End the connection
});

app.listen(80); // Make server listen to port 80 to avoid firewall configuration 

/*
// Add a booking
app.get('/add-booking', (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    //Retrieve value from the input and insert them into the table
    conn.query(`insert into Availability values ('${req.query.desc}')`, (err, rows, fields) => {});

    conn.end(); // End the connection
})
*/