const express = require('express');
const path = require('path');
const util = require('util');
let fs = require('fs');
let config = require('../config/index');


module.exports = (Collection, attrname, uniqueattrname) => {

    let router = express.Router();

    router.post('/', config.multer.single(attrname), function (req, res) {
        const find = {};
        find[uniqueattrname] = req.body[uniqueattrname];
        Collection.findOne(find, (err, doc) => {
            if (err) return res.status(500).send({ message: 'Error making requestCollection.findOne: ' + err });
            if (!doc) {
                Collection.create(req.body, (err, doc) => {
                    if (err) return res.status(500).send({ message: 'Error making request .categoriamodel.create: ' + err });
                    saveFile(req, doc, res);
                });

            } else {
                req.body._id = doc._id;
                saveFile(req, req.body, res);
            }

        }
        )
    });


    function saveFile(req, doc, res) {
        if (req.file)
            storeWithName(req.file, doc._id.toString()).then(e => {
                doc[attrname] = '/uploads/' + doc._id;
                updateDoc(doc, res);
            });
        else
            updateDoc(doc, res);

    }
    function updateDoc(doc, res) {
        Collection.updateOne({ _id: doc._id }, { $set: doc }, { upsert: true, 'new': true }, (err, doc) => {
            if (err) {
                if (err.ok == 1) {
                    res.send({ message: "Ok" });
                }
                else
                    return res.status(500).send({ message: 'Error making requestCollection.updateOne:  ' + err + "\n" + JSON.stringify(doc) });
            }
            res.status(200).send({ message: "Ok" });
        });
    }

    function storeWithName(file, name) {
        var fullNewPath = path.join(file.destination, name)
        var rename = util.promisify(fs.rename)

        return rename(file.path, fullNewPath)
            .then(() => {
                return name
            })
    }

    return router;
}



