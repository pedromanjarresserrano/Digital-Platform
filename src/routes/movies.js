let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
const models = require('../models/models');
var ffmpeg = require('fluent-ffmpeg');


router.post('/', async function (req, res) {
    let paths = req.body.path;
    let files = getFiles(path.join(paths));
    files = files.filter(e => e.endsWith(".mp4"));
    await createVideo(files, paths, res);
})

function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

module.exports = router;


const getVideoInfo = (inputPath) => {
    return new Promise((resolve, reject) => {
        return ffmpeg.ffprobe(inputPath, (error, movieInfo) => {
            if (error) {
                return reject(error);
            }
            return resolve(movieInfo);
        });
    });
};

async function createVideo(files, paths, res) {
    console.log("Length -----------" + files.length);
    for (let i = 0; i < files.length; i++) {


        let file = files[i];
        console.log(file);
        let n = file.split("/");
        let nameFile = n[n.length - 1].split(".mp4")[0];
        let movie = await models.moviemodel.findOne({ name: nameFile });
        let metadata = await getVideoInfo(file);

        if (!movie) {
            movie = await models
                .moviemodel
                .create({
                    name: nameFile,
                    url: file
                });
        }
        movie.quality = metadata.streams[0].height;
        movie.size = (metadata.streams[0].bit_rate * metadata.streams[0].duration) / 8192;
        movie.duration = metadata.streams[0].duration;
        models.moviemodel.updateOne({ _id: newmovie._id }, newmovie);
        res.write(JSON.stringify(i));

    }

    res.end();
}

