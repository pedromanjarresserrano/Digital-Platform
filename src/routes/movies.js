const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const models = require('../models');
const ffmpeg = require('fluent-ffmpeg');
const service = require('../services/movie');
var processbar = 0;
const socketServer = require("../services/socket").serverIO;
const { loggerRequest } = require('../controller/logger');

router.post('/', loggerRequest, async function (req, res) {
    try {
        let paths = req.body.path;
        if (processbar == 0) {
            processbar++;
            let files = getFiles(path.join(paths));
            files = files.filter(e => e.endsWith(".mp4"));
            await createMovie(files, paths, res);
        } else {
            return res.send({ msg: "Already running" })
        }
    } catch (error) {
        processbar = 0;
        console.log(error)
        return res.status(502).send(error);
    }
})

router.get("/progress", (req, res) => {
    res.status(200).send({ process: processbar });
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
    let errorlist = [];
    const size = files.length;
    res.send({ length: size });
    console.log("Length -----------" + size);
    let list1 = await models.moviemodel.find({})
    list1 = list1.map(e => e.url);
    console.log(list1.length);
    console.log(files.length);
    let list2 = files.filter(e => !list1.includes(e))
    console.log(list2.length);
    for (let i = 0; i < size; i++) {
        try {
            let file = files[i].replace('\\', '/');
            let n = file.split("/");
            let nameFile = n[n.length - 1].split(".mp4")[0];
            let movie = await models.moviemodel.findOne({
                $or: [
                    { name: nameFile.trim() },
                    { url: { "$regex": nameFile, "$options": "i" } }
                ]
            });
            try {
                processbar = Math.floor((i + 1) * 100 / (size), 0)
                socketServer.io.emit("RMF", { id: "processlocation", process: processbar, name: nameFile })
            } catch (error) {
                console.log(error);
            }
            if (movie && movie.files && movie.files.length == 10) {

                await models.moviemodel.findOneAndUpdate({ _id: movie._id }, { url: file })
                continue
            }
            console.log('getting meta info');
            let metadata = await getMovieInfo(file);

            if (!movie) {
                metadata = metadata.streams[0];
                let sz = ((metadata.bit_rate ? metadata.bit_rate : 1) * (metadata.duration ? metadata.duration : 1)) / 8192;
                movie = await models
                    .moviemodel
                    .create({
                        name: nameFile,
                        url: file,
                        quality: metadata.height ? metadata.height : 0,
                        size: sz ? sz : 0,
                        bitrate: metadata.bit_rate,
                        r_frame_rate: metadata.r_frame_rate,
                        avg_frame_rate: metadata.avg_frame_rate,
                        nb_frames: metadata.nb_frames,
                        duration: metadata.duration ? metadata.duration : 1,
                    });
            }
            movie.url = file;


            await generatefiles(movie, [metadata.width, metadata.height]);

        } catch (error) {
            let filess = files[i].replace('\\', '/');
            errorlist.push({
                file: 'file:///' + filess,
                error: JSON.stringify(error)
            })
            console.log(error);

            continue
        }
    }
    console.log('DELETING');
    var list = await models.moviemodel.find({ files: { $exists: true, $eq: [] } })
    list.forEach(async e => {
        await models.moviemodel.deleteOne({ _id: e._id })
    })
    processbar = 0;

    try {
        socketServer.io.emit("RMF", { id: "processlocation", process: processbar, name: '' })
    } catch (error) {
        console.log(error);
    }
    console.log('WRITING FILE');
    errorlist = {
        errorlist,
        count: errorlist.length
    }
    fs.writeFile("i:/test-" + new Date().getTime() + ".json", JSON.stringify(errorlist), function (err) {
        if (err) {
            console.log(err);
        }
    });



}



async function generatefiles(newvideo, ratio) {
    if (newvideo.files.length < 10) {
        var list = await service.generatePreviews({
            name: newvideo._id,
            url: newvideo.url,
            ratio: ratio
        })
        newvideo.files = [];
        list.map(e => "/" + (process.env.DIRTHUMBNAIL ? process.env.DIRTHUMBNAIL : "thumbnail") + "/" + e).forEach(i => newvideo.files.push(i));
        console.log(newvideo.files)
    }
    await models.moviemodel.updateOne({ _id: newvideo._id }, newvideo);

}