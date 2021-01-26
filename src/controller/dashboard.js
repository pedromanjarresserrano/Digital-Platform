const models = require('../models');
const Movies = models.moviemodel;
const Actors = models.actormodel;
const Categories = models.categoriamodel;

const getDashMovieInfo = async(req, res) => {

    try {

        let listC = await Categories.find();
        let result = [];
        for (let i = 0; i < listC.length; i++) {
            const c = listC[i];
            let listM = await Movies.find({ categorias: { $all: [c] } }).limit(8);
            if (listM.length > 0)
                result.push({
                    _id: c,
                    movies: listM
                })
        }



        res.send({ msg: "ok", result })
    } catch (error) {
        console.log(error);
        res.send({ msg: "error", error })
    }
}

const getDashActorsInfo = async(req, res) => {
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