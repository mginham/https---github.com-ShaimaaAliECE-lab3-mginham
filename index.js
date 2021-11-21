const express = require('express');
const app = express();
const newConn = require('./DBConnection'); // Import the connection details

//List of timeslot hours
const slotTimes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

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

    slotTimes[0] = req.query.slotTime1;
    slotTimes[1] = req.query.slotTime2;
    slotTimes[2] = req.query.slotTime3;
    slotTimes[3] = req.query.slotTime4;
    slotTimes[4] = req.query.slotTime5;
    slotTimes[5] = req.query.slotTime6;
    slotTimes[6] = req.query.slotTime7;
    slotTimes[7] = req.query.slotTime8;
    slotTimes[8] = req.query.slotTime9;
    slotTimes[9] = req.query.slotTime10;

    conn.end(); // End the connection
})

// Open the admin page
app.get("/admin", (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    // Get input from the admin
    let text = `<table>
                    <tr>
                        <form action='/edit-timeslots'>
                        <h2> Enter hours to be surveyed (in 24 hour format; do not include minutes) <h2>
                    </tr>
                    <tr>
                        <td>Timeslot 1:</td>
                        <td><input name='slotTime1', placeholder="Hour 1"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 2:</td>
                        <td><input name='slotTime2', placeholder="Hour 2"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 3:</td>
                        <td><input name='slotTime3', placeholder="Hour 3"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 4:</td>
                        <td><input name='slotTime4', placeholder="Hour 4"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 5:</td>
                        <td><input name='slotTime5', placeholder="Hour 5"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 6:</td>
                        <td><input name='slotTime6', placeholder="Hour 6"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 7:</td>
                        <td><input name='slotTime7', placeholder="Hour 7"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 8:</td>
                        <td><input name='slotTime8', placeholder="Hour 8"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 9:</td>
                        <td><input name='slotTime9', placeholder="Hour 9"/></td>
                    </tr>
                    <tr>
                        <td>Timeslot 10:</td>
                        <td><input name='slotTime10', placeholder="Hour 10"/></td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="Submit"></td>
                    </tr>
                </table>`

    res.send(text);

    conn.end(); // End the connection
})

// Open the guest calendar page
app.get('/calendar', (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    let text = ``; // Text to be displayed
    let guestInfo; // Array of guest info

    // Receive input from the user regarding their availability
    conn.query('SELECT * FROM Availability', 
        (err, rows, fields) => {
            guestInfo = rows;

            text += `
                <p>Times are displayed in 24 hrs</p>
                <table>   
                    <tr>
                        <th style="text-align:left">Guest Name</th>
                        <th>` + slotTimes[0] + `:00</th>
                        <th>` + slotTimes[1] + `:00</th>
                        <th>` + slotTimes[2] + `:00</th>
                        <th>` + slotTimes[3] + `:00</th>
                        <th>` + slotTimes[4] + `:00</th>
                        <th>` + slotTimes[5] + `:00</th>
                        <th>` + slotTimes[6] + `:00</th>
                        <th>` + slotTimes[7] + `:00</th>
                        <th>` + slotTimes[8] + `:00</th>
                        <th>` + slotTimes[9] + `:00</th>
                    </tr>
                    <tr>
                        <form action='/add-availability'>
                        <td><input name='guestName'/></td>
                        <td style="text-align:center"><input name='timeslot1', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot2', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot3', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot4', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot5', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot6', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot7', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot8', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot9', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input name='timeslot10', type="checkbox", value = "1" /></td>
                        <td style="text-align:center"><input type="submit" value="Submit"></td>
                    </tr>
            `;

            for (t of guestInfo) {
                text += '<tr>'
                    + '<td>' + t.guestName + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot1 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot2 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot3 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot4 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot5 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot6 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot7 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot8 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot9 + '</td>' 
                    + '<td style="text-align:center">' + t.timeslot10 + '</td>' 
                    + '</tr>';
            }

            text += '</table>';

            res.send(text);
        })

    conn.end(); // End the connection
});

app.listen(80); // Make server listen to port 80 to avoid firewall configuration 