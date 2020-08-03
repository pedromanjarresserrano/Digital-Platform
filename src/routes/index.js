
const models = require('../models');


module.exports = (app) => {
    app.use('/api/movie', require('./movie'));
    app.use('/api/movies', require('./routesmovies'));
    app.use('/api/movies', require('./routesfile')(models.moviemodel, 'portada', 'name'));
    app.use('/api/movies', require('./crud')(models.moviemodel, { created: -1 }));
    app.use('/api/studios', require('./routesfile')(models.studioSchema, 'image', 'name'));
    app.use('/api/studios', require('./crud')(models.studioSchema, { name: "asc" }));
    app.use('/api/actores', require('./routesfile')(models.actormodel, 'imageAvatar', 'name'));
    app.use('/api/actores', require('./crud')(models.actormodel, { name: "asc" }));
    app.use('/api/categorias', require('./routesfile')(models.categoriamodel, 'image', 'name'));
    app.use('/api/categorias', require('./crud')(models.categoriamodel, { name: "asc" }));
    app.use('/api/usuario', require('./crud')(models.usuariomodel, { name: "asc" }));
    app.use('/api/location', require('./crud')(models.locationmodel, { name: "asc" }));
    app.use('/api/movies/read', require('./movies'));
    app.use('/api/admin', require('./auth'));

    app.use('/file', require('./file'));
    app.use('/api/dashboard', require('./dashboard'));
    app.use('/api/fixes', require('./fixes'));
}