const express = require('express');
const config = require('../config/index');
const { saveFile } = require('../services/files');
const { loggerRequest } = require('../controller/logger');
const { tokenValidator } = require('../controller/auth');
const mime = require('mime-types')

module.exports = (Collection, attrname, uniqueattrname) => {

    const router = express.Router();

    router.post('/', loggerRequest, tokenValidator, config.multer.single(attrname), async function(req, res) {
        try {
            const find = {};

            find[uniqueattrname] = req.body[uniqueattrname] ? req.body[uniqueattrname].trim() : "null";
            let doc = await Collection.findOne(find)
            if (!doc) {
                doc = await Collection.create(req.body)
            } else {
                req.body._id = doc._id;
                doc = req.body;
            }
            if (req.file && req.file.mimetype)
                doc[attrname] = '/uploads/' + doc._id + '.' + mime.extension(req.file.mimetype);
            saveFile(req.file, doc, Collection);

            return res.status(200).send({ message: "Ok", doc });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Error making post ' + error });
        }

    });



    return router;
}