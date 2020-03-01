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
        let n = file.split("/");
        let nameFile = n[n.length - 1].split(".mp4")[0];
        let movie = await models.moviemodel.findOne({ name: nameFile });
        if (!movie) {
            let metadata = await getVideoInfo(file);
            metadata = metadata.streams[0];
            movie = await models
                .moviemodel
                .create({
                    name: nameFile,
                    url: file,
                    quality: metadata.height,
                    size: (metadata.bit_rate * metadata.duration) / 8192,
                    duration: metadata.duration,
                });
        }
        res.write(JSON.stringify(i));
    }
    res.end();

}

