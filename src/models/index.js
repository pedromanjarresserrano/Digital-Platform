const moviemodel = require('./movie');
const actormodel = require('./actor');
const categoriamodel = require('./categoria');
const usuariomodel = require('./usuario');
const locationmodel = require('./location');
const studioSchema = require('./studio');
const bookmodel= require('./book');
const models = {}


models.moviemodel = moviemodel;
models.actormodel = actormodel;
models.studioSchema = studioSchema;
models.categoriamodel = categoriamodel;
models.usuariomodel = usuariomodel;
models.locationmodel = locationmodel;
models.bookmodel = bookmodel;



module.exports = models;