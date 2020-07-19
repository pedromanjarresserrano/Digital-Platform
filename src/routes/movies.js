let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
const models = require('../models/models');
var ffmpeg = require('fluent-ffmpeg');
const service = require('../services/movie');
var process = 0;
var socketServer = require("../services/socket").socketServer

router.post('/', async function (req, res) {
    let paths = req.body.path;
    if (process == 0) {
        process++;
        let files = getFiles(path.join(paths));
        files = files.filter(e => e.endsWith(".mp4"));
        await createMovie(files, paths, res);
    } else {
        res.send({ msg: "Already running" })
    }

})

router.get("/progress", (req, res) => {
    res.status(200).send({ process });
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


const getMovieInfo = (inputPath) => {
    return new Promise((resolve, reject) => {
        return ffmpeg.ffprobe(inputPath, (error, movieInfo) => {
            if (error) {
                return reject(error);
            }
            return resolve(movieInfo);
        });
    });
};

async function createMovie(files, paths, res) {
    console.log("Length -----------" + files.length);
    res.send({ length: files.length });
    for (let i = 0; i < files.length; i++) {
        try {
            process = Math.floor((i + 1) * 100 / files.length, 0)

            let file = files[i];
            let n = file.split("/");
            let nameFile = n[n.length - 1].split(".mp4")[0];
            let movie = await models.moviemodel.findOne({ name: nameFile });
            try {
                if (socketServer.socket)
                    socketServer.socket.emit("RMF", { process, name: nameFile })
            } catch (error) {
                console.log(error);
            }
            let metadata = await getMovieInfo(file);
            if (!movie) {
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
            movie.url = file;
            await generatefiles(movie, [metadata.width, metadata.height]);
        } catch (error) {
            console.log(error);
            continue
        }
    }
    process = 0;
}



async function generatefiles(newvideo, ratio) {
    if (newvideo.files.length < 10) {
        var list = await service.generatePreviews({
            name: newvideo._id, url: newvideo.url, ratio: ratio
        })
        newvideo.files = [];
        list.map(e => "/thumbnail/" + e).forEach(i => newvideo.files.push(i));
        await models.moviemodel.updateOne({ _id: newvideo._id }, newvideo);

    }
}
