
var express = require("express");
var app = new express();
const db = require('./utils/db');
var port = process.env.port || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models/models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../public"));
app.use('/api/movie', require('./routes/movie'));
app.use('/api/movies', require('./routes/routesmovies'));
app.use('/api/movies', require('./routes/routesfile')(models.moviemodel, 'portada', 'name'));
app.use('/api/movies', require('./routes/crud')(models.moviemodel));
app.use('/api/studios', require('./routes/routesfile')(models.studioSchema, 'image', 'name'));
app.use('/api/studios', require('./routes/crud')(models.studioSchema));
app.use('/api/actores', require('./routes/routesfile')(models.actormodel, 'imageAvatar', 'name'));
app.use('/api/actores', require('./routes/crud')(models.actormodel));
app.use('/api/categorias', require('./routes/routesfile')(models.categoriamodel, 'image', 'name'));
app.use('/api/categorias', require('./routes/crud')(models.categoriamodel));
app.use('/api/imageset', require('./routes/crud')(models.imagesetmodel));
app.use('/api/usuario', require('./routes/crud')(models.usuariomodel));
app.use('/api/location', require('./routes/crud')(models.locationmodel));
app.use('/api/movies/read', require('./routes/movies'));

app.use('/file', require('./routes/file'));

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, "/../public") });
})

app.listen(port, () => console.log(`Listening on port ${port}`));

