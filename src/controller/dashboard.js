const models = require('../models/models');
const Movies = models.moviemodel;

const getDashMovieInfo = async (req, res) => {

    try {

        let result = await Movies.aggregate([
            { "$unwind": "$categorias" },
            {
                "$group": {
                    "_id": '$categorias',

                    "movies": { $push: "$_id" }
                }
            },
            {
                "$lookup": {
                    "from": Movies.collection.name,
                    "localField": "movies",
                    "foreignField": "_id",
                    "as": "movies"
                }
            }
        ]);
        result = await models.categoriamodel.populate(result, { path: '_id' })
        res.send({ msg: "ok", result })
    } catch (error) {
        res.send({ msg: "error", error })
    }
}


const getDashActorsInfo = async (req, res) => {
    try {
        let result = await Movies.aggregate([
            { "$unwind": "$reparto" },
            {
                "$group": {
                    "_id": '$reparto',

                    "movies": { $push: "$_id" }
                }
            },
            {
                "$lookup": {
                    "from": Movies.collection.name,
                    "localField": "movies",
                    "foreignField": "_id",
                    "as": "movies"
                }
            }
        ]);

        result = await models.actormodel.populate(result, { path: '_id' })
        res.send({ msg: "ok", result })
    } catch (error) {
        res.send({ msg: "error", error })
    }
}



module.exports = {
    getDashMovieInfo,
    getDashActorsInfo
}