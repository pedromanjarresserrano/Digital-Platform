const moviemodel = require('./movie');
const actormodel = require('./actor');
const categoriamodel = require('./categoria');
const usuariomodel = require('./usuario');
const locationmodel = require('./location');
const studioSchema = require('./studio');
const bookmodel = require('./book');
const imagesetmodel = require('./imageset');
const sagamodel = require('./saga');
const models = {
    moviemodel,
    actormodel,
    studioSchema,
    categoriamodel,
    usuariomodel,
    locationmodel,
    bookmodel,
    imagesetmodel,
    sagamodel
}

module.exports = models;