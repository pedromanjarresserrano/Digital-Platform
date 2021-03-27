const express = require("express");
const session = require('express-session');
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())

app.use(session({
    secret: process.env.SECRETSESSION || 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/../public"));
require('./routes')(app);
require('./services/socket').init(app);


app.get('*', function(req, res) {
    return res.sendFile('index.html', { root: path.join(__dirname, "/../public") });
})


module.exports = app;