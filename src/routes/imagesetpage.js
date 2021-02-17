const express = require('express');
const router = express.Router();
const fs = require('fs');
const models = require('../models');
const { Stream } = require('stream');

router.get('/', async function(req, res) {
    let id = req.query.id;
    let name = req.query.name;

    let movie = await models.imagesetmodel.findOne({ _id: id });


    const r = fs.createReadStream(movie.url + "//" + name) // or any other way to get a readable stream
    const ps = new Stream.PassThrough() // <---- this makes a trick with stream error handling
    Stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res) // <---- this makes a trick with stream error handling

})




module.exports = router;