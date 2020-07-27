const moviemodel = require('./movie');
const actormodel = require('./actor');
const categoriamodel = require('./categoria');
const usuariomodel = require('./usuario');
const locationmodel = require('./location');
const studioSchema = require('./studio');
const models = {}


models.moviemodel = moviemodel;
models.actormodel = actormodel;
models.studioSchema = studioSchema;
models.categoriamodel = categoriamodel;
models.usuariomodel = usuariomodel;
models.locationmodel = locationmodel;



module.exports = models;