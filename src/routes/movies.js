const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const models = require('../models');
const ffmpeg = require('fluent-ffmpeg');
const service = require('../services/movie');
var process = 0;
const socketServer = require("../services/socket").serverIO;
const { loggerRequest } = require('../controller/logger');

router.post('/', loggerRequest, async function(req, res) {
    try {
        let paths = req.body.path;
        if (process == 0) {
            process++;
            let files = getFiles(path.join(paths));
            files = files.filter(e => e.endsWith(".mp4"));
            await createMovie(files, paths, res);
        } else {
            return res.send({ msg: "Already running" })
        }
    } catch (error) {
        process = 0;
        console.log(error)
        return res.status(502).send(error);
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
    const size = files.length;
    console.log("Length -----------" + size);
    res.send({ length: size });
    for (let i = 0; i < size; i++) {
        try {
            let file = files[i];
            let n = file.split("/");
            let nameFile = n[n.length - 1].split(".mp4")[0];
            let movie = await models.moviemodel.findOne({
                $or: [
                    { name: nameFile.trim() },
                    { url: { "$regex": nameFile, "$options": "i" } }
                ]
            });
            try {
                process = Math.floor((i + 1) * 100 / (size), 0)
                socketServer.io.emit("RMF", { process, name: nameFile })
            } catch (error) {
                console.log(error);
            }
            if (movie && movie.files && movie.files.length == 10) {

                await models.moviemodel.findOneAndUpdate({ _id: movie._id }, { url: file })
                continue
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
            continue
        }
    }
    var list = await models.moviemodel.find({ files: { $exists: true, $eq: [] } })
    list.forEach(async e => {
        await models.moviemodel.deleteOne({ _id: e._id })
    })
    process = 0;
}



async function generatefiles(newvideo, ratio) {
    if (newvideo.files.length < 10) {
        var list = await service.generatePreviews({
            name: newvideo._id,
            url: newvideo.url,
            ratio: ratio
        })
        newvideo.files = [];
        list.map(e => "/thumbnail/" + e).forEach(i => newvideo.files.push(i));
    }
    await models.moviemodel.updateOne({ _id: newvideo._id }, newvideo);

}