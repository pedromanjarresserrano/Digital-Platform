let fs = require('fs')
let express = require('express');
const models = require('../models');
const { loggerRequest } = require('../controller/logger');
let router = express.Router();

//
//	Stream the movie
//
router.get('/:_id', loggerRequest, async function (req, res) {
    try {
        const { _id } = req.params;
        const movie = await models.moviemodel.findById(_id);
        if (!movie)
            return res.status(404).send({ message: 'The movie does not exist ' })
        const path = movie.url;
        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
            var split = range.split(/[-=]/);
            const start = split[1] ? parseInt(split[1]) : 0;
            const base = (fileSize / 100000000);
            let end;
            const chunksize = 1024 * 1024 * (base < 1 ? 1 : (parseInt(base) + 4));
            if (chunksize > fileSize) {
                chunksize = fileSize;
            }
            if (start + chunksize > fileSize) {
                end = fileSize;
            } else {
                end = split[2] ? split[2] : start + chunksize;
            }
            if (parseInt(start) > fileSize || parseInt(end) > fileSize) {
                //Indicate the acceptable range.
                res.status(416);
                res.set("Content-Range", 'bytes */' + fileSize); // File size.
                //Return the 416 'Requested Range Not Satisfiable'.
                res.end();
            }
            if (!end) {
                end = start + chunksize;
            }
            end-=1;
            const file = fs.createReadStream(path, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }
      //  movie.unique_views.push(req.sessionID)
      //  movie.view = movie.unique_views.length;
      //  movie.save();

    } catch (error) {
        res.status(502).send({ msg: "error", error })
    }
});

module.exports = router;