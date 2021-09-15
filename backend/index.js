const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");

// mentioning the path for the secure variables
dotenv.config({ path: './.env' });
const app = express();

// setting up cors and json
app.use(express.json());
app.use(cors());

// stating the connection to the database
let db = mysql.createConnection({
    host       : "localhost",
    user       : "root",
    password   : process.env.mySQLMasterKey,
    database   : "inventory",
});

// establishing the connection to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected To Inventory[db] Successfully!');
});

const PORT = process.env.PORT || 3000;

// starting the server
app.listen(PORT, () => {
    console.log(`PORT: [PORT]`);
});

app.get("/", (req, res) => {
    res.send("<h1>HELLO!</h1>")
})

app.get("/inventory", (req, res) => {
    db.query(`SELECT * FROM log`, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/inventory/item/:id", (req, res) => {
    const id = req.params.id;

    db.query(`SELECT * FROM log WHERE id = ${id}`, (err, results) => {
        if (err) throw err;

        res.send(results);
    });
});