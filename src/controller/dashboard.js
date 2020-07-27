const models = require('../models');
const Movies = models.moviemodel;
const Actors = models.actormodel;

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
        let result = await Actors.find({}).sort({ updated: -1 }).limit(12)

        res.send({ msg: "ok", result })
    } catch (error) {
        res.send({ msg: "error", error })
    }
}



module.exports = {
    getDashMovieInfo,
    getDashActorsInfo
}