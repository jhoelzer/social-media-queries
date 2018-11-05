const {Client} = require("pg");
const express = require("express");

let port = 3000;

// create express app
const app = express();
app.use(express.json());

// create a postgresql client 
const client = new Client({
    database: 'social-media'
});

// route handlers go here
app.get("/users", (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        if(err) {
            res.status(500).send();
            return console.log(err);
        };
        res.send(result.rows);
    });
});

app.post('/users', (req, res) => {

    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = [`${req.body.username}`, `${req.body.bio}`];

    client.query(text, values, (err, result) => {
        console.log(result.rows[0]);
        res.send(result.rows[0]);
    });
});

app.get('/users/:id', (req, res) => {
    
    const text = 'SELECT * FROM users WHERE id=$1';
    const values = [`${req.params.id}`];
    
    client.query(text, values, (err, result) => {
        res.send(result.rows);
    });
});

// start a server that listens on port 3000 and connects the sql client on success
app.listen(port, () => {
    console.log("Listening on port " + port);
    client.connect();
});