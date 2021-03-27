const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const models = require('../models');
var process = 0;
const socketServer = require("../services/socket").socketServer;
const { loggerRequest } = require('../controller/logger');

router.post('/', loggerRequest, async function(req, res) {
    try {
        let paths = req.body.path;
        if (process == 0) {
            process++;
            let files = getDirs(path.join(paths));
            await createBook(files, res);
        } else {
            res.send({ msg: "Already running" })
        }
    } catch (error) {
        process = 0;
        res.status(502).send(error);
    }
    return;
})

router.get("/progress", (req, res) => {
    res.status(200).send({ process });
})

function getDirs(dir, dirs_) {
    dirs_ = dirs_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        var valuedir = fs.statSync(name);
        if (valuedir.isDirectory()) {
            if (fs.readdirSync(name).length > 1) {
                dirs_.push(name);
            } else {
                getDirs(name, dirs_);
            }

        }
    }
    return dirs_;
}

module.exports = router;

function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];

        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            let n = name.split("/");

            files_.push(n[n.length - 1]);
        }
    }
    return files_;
}

async function createBook(files, res) {
    const size = files.length;
    console.log("Length -----------" + size);
    res.send({ length: size });
    for (let i = 0; i < size; i++) {
        try {

            let file = files[i];
            let n = file.split("/");
            let nameFile = n[n.length - 1];
            let movie = await models.bookmodel.findOne({ name: nameFile });
            try {
                process = Math.floor((i + 1) * 100 / (size), 0)
                if (socketServer.socket)
                    socketServer.socket.emit("RMF", { process, name: nameFile })
            } catch (error) {
                console.log(error);
            }
            let imgs = getFiles(file);
            if (!movie) {
                await models
                    .bookmodel
                    .create({
                        name: nameFile,
                        url: file,
                        files: imgs,
                        portada: imgs[0]
                    });
            }
        } catch (error) {
            //   console.log(error);
            continue
        }
    }
    process = 0;
}