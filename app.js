const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const apiUrl = './router/';

app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('public'));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error
    })
});

// Account
app.use(`/account`, require(`${apiUrl}account`));

// Product
app.use(`/product`, require(`${apiUrl}product`))

// Bill
app.use(`/bill`, require(`${apiUrl}bill`));
module.exports = app;