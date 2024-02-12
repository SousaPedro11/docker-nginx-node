const express = require('express');
const mysql = require('mysql2');
const randomName = require('random-name');

const app = express();

const connection = mysql.createConnection({
    host: 'mysql_db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

connection.execute('CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))');

app.get('/', (req, res) => {
    const name = randomName.first();
    var content = '';
    connection.execute('INSERT INTO people (name) VALUES (?)', [name], (err) => {
        if (err) throw err;
        connection.query('SELECT * FROM people', (err, results) => {
            if (err) throw err;

            results.forEach(result => {
                content += `<li>${result.id} - ${result.name}</li>`;
            });

            res.send(`<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Full Cycle Rocks</title>
            </head>
            
            <body>
            <h1>Full Cycle Rocks!</h1>
            <ul>
                ${content}
            </ul>
            </body>
            
            </html>`);
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
