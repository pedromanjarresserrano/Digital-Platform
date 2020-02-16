const express = require('express');
let router = express.Router();
var path = require('path')
var util = require('util')
let fs = require('fs')
const models = require('../models/models');

var multer = require('multer')({
    dest: 'public/uploads'
})

router.post('/', multer.single('image'), function (req, res) {
    models.categoriamodel.findOne({ name: req.body.name }, (err, categoria) => {
        if (err) return res.status(500).send({ message: 'Error making request categoriamodel.findOne: ' + err });
        if (!categoria) {
            models.categoriamodel.create({ name: req.body.name }, (err, categoria) => {
                if (err) return res.status(500).send({ message: 'Error making request .categoriamodel.create: ' + err });
                saveFile(req, categoria, res);
            });

        } else {
            saveFile(req, categoria, res);
        }

    }
    )
});


function saveFile(req, categoria, res) {
    storeWithName(req.file, categoria._id.toString()).then(e => {
        models.filemodel.findOne({ name: categoria._id }, (err, file) => {
            if (err)
                return res.status(500).send({ message: 'Error making request filemodel.findOne: ' + err });
            if (!file) {
                models.filemodel.create({
                    name: categoria._id,
                    url: '/uploads/' + categoria._id
                }, (err, file) => {
                    if (err)
                        return res.status(500).send({ message: 'Error making request filemodel.create: ' + err });
                    updateFilecategoria(categoria, file, res);
                });
            } else {
                updateFilecategoria(categoria, file, res);
            }
        });
    });
}

function updateFilecategoria(categoria, file, res) {
    categoria.image = file;
    models.categoriamodel.updateOne({ _id: categoria._id }, categoria).then((err, categoria) => {
        if (err) {
            if (err.ok == 1) {
                res.send({ message: "Ok" });
            }
            else
                return res.status(500).send({ message: 'Error making request categoriamodel.updateOne:  ' + JSON.stringify(err) });
        }
        res.send(JSON.stringify(categoria));
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

module.exports = router;