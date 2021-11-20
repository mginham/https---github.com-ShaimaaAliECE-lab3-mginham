const express = require('express');
const app = express();
const newConn = require('./DBConnection'); // Import the connection details

// Creates the routing needed to serve the static files (can now load the files that are in the public directory)
app.use(express.static('static'))

// Dynamic handling //

// 
app.get("/add-avail", (req,res) => {
    let conn = newConn();
    conn.connect();

        if (req.query.time1 != 1)
            req.query.time1 = 0;
        if (req.query.time2 != 1)
            req.query.time2 = 0;
        if (req.query.time3 != 1)
            req.query.time3 = 0;
        if (req.query.time4 != 1)
            req.query.time4 = 0;
        if (req.query.time5 != 1)
            req.query.time5 = 0;
        if (req.query.time6 != 1)
            req.query.time6 = 0;
        if (req.query.time7 != 1)
            req.query.time7 = 0;
        if (req.query.time8 != 1)
            req.query.time8 = 0;
        if (req.query.time9 != 1)
            req.query.time9 = 0;
        if (req.query.time10 != 1)
            req.query.time10 = 0;

    conn.query(`insert into Bookings values('${req.query.name}','${req.query.time1}','${req.query.time2}','${req.query.time3}','${req.query.time4}','${req.query.time5}','${req.query.time6}','${req.query.time7}','${req.query.time8}','${req.query.time9}','${req.query.time10}')`
        , (err,rows,fields) => {
            console.log(req.query.time1);
            res.redirect('/times');
        });

    conn.end();
})

app.get("/change-times", (req,res) => {
    let conn = newConn();
    conn.connect();
    
    conn.query(`alter table Bookings change time1 '${req.query.time1} tinytint)`
        , (err,rows,fields) => {
            res.redirect('/admin');
        });

    conn.query(`alter table Bookings change time2 '${req.query.time2} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time3 '${req.query.time3} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time4 '${req.query.time4} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time5 '${req.query.time5} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time6 '${req.query.time6} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time7 '${req.query.time7} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time8 '${req.query.time8} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time9 '${req.query.time9} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time10 '${req.query.time10} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });

    conn.query(`alter table Bookings change time2 '${req.query.time2} tinytint)`
    , (err,rows,fields) => {
        res.redirect('/admin');
    });
        

    conn.end();
})

app.get("/admin", (req,res) => {
    let conn = newConn();
    conn.connect();

    let content = `<form action='/change-times'>
    <h2> Please Insert the Available Bookings (10 minute slots)<h2>
    <h4> Available Bookings should not be changed after user data is submitted <h4>
    <input name='time1', placeholder="HH:MM"/>
    <input name='time2', placeholder="HH:MM"/>
    <input name='time3', placeholder="HH:MM"/>
    <input name='time4', placeholder="HH:MM"/>
    <input name='time5', placeholder="HH:MM"/>
    <input name='time6', placeholder="HH:MM"/>
    <input name='time7', placeholder="HH:MM"/>
    <input name='time8', placeholder="HH:MM"/>
    <input name='time9', placeholder="HH:MM"/>
    <input name='time10', placeholder="HH:MM"/>
    <input type="submit" value="Submit">

    <h2>Guest View:</h2>
    <a href='/times'>See Calendar</a>`

    res.send(content);

    conn.end();
})

app.get('/times', (request, response) => {
    let conn= newConn();
    conn.connect();

    let content = ``;

    // let columns;
    // conn.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = Bookings', (err,rows,fields) => {
        
    //     columns = rows;

    //     for (p of columns) {
    //         content += p.name;
    //     }
       
        
    // })

    let timesList;
    conn.query('select * from Bookings', (err,rows,fields) => {
        
        BookingsList = rows;

        content += 
            `<table>   
                <tr>
                    <th>Name</th>
                    <th>Time 1</th>
                    <th>Time 2</th>
                    <th>Time 3</th>
                    <th>Time 4</th>
                    <th>Time 5</th>
                    <th>Time 6</th>
                    <th>Time 7</th>
                    <th>Time 8</th>
                    <th>Time 9</th>
                    <th>Time 10</th>
                </tr>
                <tr>
                <form action='/add-avail'>
                <td><input name='name'/></td>
                <td><input name='time1', type="checkbox", value = "1" /></td>
                <td><input name='time2', type="checkbox", value = "1" /></td>
                <td><input name='time3', type="checkbox", value = "1" /></td>
                <td><input name='time4', type="checkbox", value = "1" /></td>
                <td><input name='time5', type="checkbox", value = "1" /></td>
                <td><input name='time6', type="checkbox", value = "1" /></td>
                <td><input name='time7', type="checkbox", value = "1" /></td>
                <td><input name='time8', type="checkbox", value = "1" /></td>
                <td><input name='time9', type="checkbox", value = "1" /></td>
                <td><input name='time10', type="checkbox", value = "1" /></td>
                <td><input type="submit" value="Submit"></td>
                </tr>
    
                
                `;

        for (p of timesList) {
            content += '<tr>';
            content += '<td>';
            content += p.name;
            content += '</td>';
            content += '<td>';
            content += p.time1;
            content += '</td>';
            content += '<td>';
            content += p.time2;
            content += '</td>';
            content += '<td>';
            content += p.time3;
            content += '</td>';
            content += '<td>';
            content += p.time4;
            content += '</td>';
            content += '<td>';
            content += p.time5;
            content += '</td>';
            content += '<td>';
            content += p.time6;
            content += '</td>';
            content += '<td>';
            content += p.time7;
            content += '</td>';
            content += '<td>';
            content += p.time8;
            content += '</td>';
            content += '<td>';
            content += p.time9;
            content += '</td>';
            content += '<td>';
            content += p.time10;
            content += '</td>';
            content += '</tr>';
            
        }
        content += '</table>';
        response.send(content);
    })
    


    conn.end();
});

app.listen(80); // Make server listen to port 80 to avoid firewall configuration 

/*
// Add a booking
app.get('/add-booking', (req, res) => {
    let conn = newConn(); // Create the connection
    conn.connect(); // Establish the connection

    //Retrieve value from the input and insert them into the table
    conn.query(`insert into Bookings values ('${req.query.desc}')`, (err, rows, fields) => {});

    conn.end(); // End the connection
})
*/