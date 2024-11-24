const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Collection = require('../models').moviemodel;
const SagaCollection = require('../models').sagamodel;
const config = require("../config/index")
const attrname = "portada";
const { saveFile } = require('../services/files');
const fs = require('fs')

const { tokenValidator } = require('../controller/auth');
const { loggerRequest } = require('../controller/logger');


const update = async (req, res) => {
    try {
        let changedEntry = req.body;
        changedEntry._id = new ObjectID(changedEntry._id);
        changedEntry.categorias = changedEntry.categorias ? Array.isArray(changedEntry.categorias) ? changedEntry.categorias.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.categorias)] : [];
        changedEntry.reparto = changedEntry.reparto ? Array.isArray(changedEntry.reparto) ? changedEntry.reparto.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.reparto)] : [];
        changedEntry = await Collection.updateOne({ _id: req.params._id }, { $set: changedEntry })
        res.status(200).send(changedEntry);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making update ' + error });
    }

};


const likedOne = async (req, res) => {
    try {
        const { _id } = req.params;
        var result = await Collection.findById(_id);
        result.like = result.like ? result.like + 1 : 1;
        await Collection.updateOne({ _id: _id }, { $set: { like: result.like } });
        res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making liked one ' + error });
    }

};


router.post('/', config.multer.single(attrname), async function (req, res) {
    try {
        const find = {};
        find["name"] = req.body["name"];
        var doc = await Collection.findOne({ "_id": req.body["_id"] });
        if (!doc)
            doc = await Collection.findOne(find);

        let changedEntry = req.body;


        if (Array.isArray(changedEntry.categorias)) {
            changedEntry.categorias = changedEntry.categorias ? changedEntry.categorias.map(e => new ObjectID(e)) : [];
        } else {
            changedEntry.categorias = changedEntry.categorias ? [new ObjectID(changedEntry.categorias)] : [];
        }
        changedEntry.reparto = changedEntry.reparto ? Array.isArray(changedEntry.reparto) ? changedEntry.reparto.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.reparto)] : [];
        if (doc) {
            changedEntry._id = new ObjectID(doc._id);
            changedEntry = await Collection.findOneAndUpdate({ _id: changedEntry._id }, { $set: changedEntry }, { upsert: true, new: true, setDefaultsOnInsert: true, fields: '-__v' }).exec();
        } else {
            changedEntry = await Collection.create(changedEntry);
        }
        changedEntry[attrname] = '/uploads/' + changedEntry._id;

        await saveFile(req.file, changedEntry, Collection);
        console.log(doc);


        res.status(200).send({ message: "Ok", doc });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making post ' + error });
    }

});


const addcatgs = async function (req, res) {
    try {
        console.log(req.body);


        let list = await Collection.find({ _id: { $in: req.body.items } });

        console.log(list);
        list.forEach(async item => {
            req.body.value.forEach(async cat => {
                if (item.categorias.map(e => e.toString()).join(',').indexOf(cat) == -1)
                    item.categorias.push(new ObjectID(cat))

                await Collection.findOneAndUpdate({ _id: item._id }, { $set: item }, { upsert: true, new: true, setDefaultsOnInsert: true, fields: '-__v' })
            })
        })

        res.json({ message: 'All OK' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making post ' + error });
    }
}


const addacts = async function (req, res) {
    try {
        console.log(req.body);


        let list = await Collection.find({ _id: { $in: req.body.items } });

        console.log(list);
        list.forEach(item => {
            req.body.value.forEach(async actor => {
                if (item.reparto.map(e => e.toString()).join(',').indexOf(actor) == -1)
                    item.reparto.push(new ObjectID(actor))

                await Collection.findOneAndUpdate({ _id: item._id }, { $set: item }, { upsert: true, new: true, setDefaultsOnInsert: true, fields: '-__v' })

            })
        })

        res.json({ message: 'All OK' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making post ' + error });
    }
}

const addtosaga = async function (req, res) {
    try {
        console.log(req.body);
        let list = await Collection.find({ _id: { $in: req.body.items } });
        let saga = await SagaCollection.findOne({ _id: item._id });
        saga.parts.add(list)
        console.log(list);
        await SagaCollection.findOneAndUpdate({ _id: item._id }, { $set: saga }, { upsert: true, new: true, setDefaultsOnInsert: true, fields: '-__v' })
        res.json({ message: 'All OK' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making post ' + error });
    }
}

const addsts = async function (req, res) {
    try {
        console.log(req.body);


        let list = await Collection.find({ _id: { $in: req.body.items } });

        console.log(list);
        list.forEach(async item => {
            if (item.studio != -1)
                item.studio = new ObjectID(req.body.value)

            await Collection.findOneAndUpdate({ _id: item._id }, { $set: item }, { upsert: true, new: true, setDefaultsOnInsert: true, fields: '-__v' })


        })

        res.json({ message: 'All OK' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error making post ' + error });
    }
}

const remove = async (req, res) => {
    console.log('New delete movie');
    try {
        let doc = await Collection.findById(req.params._id);
        if (doc.files) {

            doc.files.forEach(file => {
                let path = "./public/" + file;
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    console.log("file " + file + " removed");
                })
            })
        }

        await Collection.deleteOne({ _id: req.params._id });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }



};

const duplicates = async (req, res) => {
    try {
        let page = req.query.page;
        let response = { items: [] };
        let dura = await Collection.aggregate([
            { "$group": { "_id": "$duration", "count": { "$sum": 1 } } },
            { "$match": { "_id": { "$ne": null }, "count": { "$gt": 1 } } },
            { "$project": { "duration": "$_id", "_id": 0 } },
            { $sort: { duration: 1 } }

        ]);


        for (const i of dura) {
            let dupe = await Collection.find({ "duration": { $gte: i.duration, $lte: i.duration } })
            if (dupe.length > 1)
                response.items.push({
                    _id: i,

                    idsForDuplicatedDocs: dupe
                })
        }
        let pagesize = 5;
        let count = response.items.length;
        let aux = (page - 1) * pagesize;
        console.log(aux)
        response.items = response.items.slice(aux, aux + pagesize);
        response.count = count;
        response.pages = Math.ceil(count / pagesize);
        response.pagesize = pagesize;

        /*
      response = await Collection.aggregate([{
          $group: {
              _id: { duration: "$duration" },
              idsForDuplicatedDocs: { $addToSet: "$_id" },
              count: { $sum: 1 }
          }
      },
      {
          $match: {
              count: { $gt: 1 }
          }
      },
      { $sort: { count: -1 } }
      ]);

      for (const i of response) {
          for (let j = 0; j < i.idsForDuplicatedDocs.length; j++) {
              const e = i.idsForDuplicatedDocs[j];
              i.idsForDuplicatedDocs[j] = await Collection.findById(e).exec();
          }
      }
*/
        res.send(response)
        return;
    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }



};

const removeWithFile = async (req, res) => {
    console.log('New delete movie');
    try {
        let doc = await Collection.findById(req.params._id);
        if (doc) {
            let path = doc.url;

            fs.unlink(path, async (err) => {
                if (err) {
                    console.log(err)
                    return res.status(502).send(err);

                }
                await Collection.deleteOne({ _id: req.params._id });
                res.sendStatus(200);
                console.log("file " + path + " removed");
                if (doc.files) {
                    doc.files.forEach(file => {
                        let fpath = "./public/" + file;
                        fs.unlink(fpath, (errf) => {
                            if (err) {
                                console.log(errf)
                                return res.status(502).send(errf);

                            }

                            console.log("file " + file + " removed");
                        })
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }



};

const renameFile = async (req, res) => {
    console.log('rename file movie');
    try {
        let changedEntry = req.body;
        let doc = await Collection.findById(req.params._id);
        if (doc.files) {


            let path = doc.url;
            let spliter = path.split('/');
            let name = spliter.pop();
            let aux = name.split(".");
            aux[0] = changedEntry.name;

            name = aux.join('.');
            spliter.push(name);
            let newname = spliter.join('/');
            console.log(path);
            console.log(newname);
            fs.rename(path, newname, async (err) => {
                if (err) {
                    console.error(err)

                }


                console.log("file " + path + " renamed");
                console.log("file new name " + newname);

                //   await Collection.({ _id: req.params._id });
                await Collection.findOneAndUpdate({ _id: doc._id }, { $set: { name: changedEntry.name, visualname: changedEntry.name, url: newname } }, { upsert: true, new: true, setDefaultsOnInsert: true, fields: '-__v' }).exec();

            })
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }



};


router.post('/:_id/like', loggerRequest, likedOne);
router.put('/:_id', loggerRequest, tokenValidator, update);
router.post('/addcatgs', loggerRequest, tokenValidator, addcatgs);
router.post('/addacts', loggerRequest, tokenValidator, addacts);
router.post('/addtosaga', loggerRequest, tokenValidator, addtosaga);
router.post('/addsts', loggerRequest, tokenValidator, addsts);
router.delete('/:_id', loggerRequest, tokenValidator, remove);
router.delete('/deletewithfile/:_id', loggerRequest, tokenValidator, removeWithFile);
router.get('/duplicates', loggerRequest, duplicates);
router.post('/renamefile/:_id', loggerRequest, tokenValidator, renameFile);



module.exports = router;