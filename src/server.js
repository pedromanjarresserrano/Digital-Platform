
var express = require("express");
var session = require('express-session');

var app = new express();
const db = require('./utils/db');
var port = process.env.port || 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/../public"));
require('./routes')(app);
require('./services/socket').init(app);


app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, "/../public") });
})


app.listen(port, () => console.log(`Listening on port ${port}`));

