let express = require('express');
let router = express.Router();
let ObjectID = require('mongodb').ObjectID;
let Collection = require('../models/models').moviemodel;
let config = require("../config/index")
let options = config.options;


const readMany = async (req, res) => {
    let query = req.body || {};
    query = Object.keys(query).length === 0 ? req.query : query;
    options.page = parseInt(req.params.page);
    if (query.duration)
        query.duration = { $gte: parseInt(query.duration[0]) * 60, $lte: parseInt(query.duration[1]) * 60 }
    console.log(query);
    console.log(options);
    if (options.page == -1) {
        let result = await Collection.find(query).sort({ updated: -1 });/*, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {*/
        res.send(result);
        /*}
    });*/
    } else {
        options.sort = { updated: -1 };
        let result = await Collection.paginate(query, options);/*, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else { */
        res.send(result);
        /*}
    });*/
    }


}

const update = async (req, res) => {
    let changedEntry = req.body;

    changedEntry._id = new ObjectID(changedEntry._id);
    if (changedEntry.categorias) {
        changedEntry.categorias = Array.isArray(changedEntry.categorias) ? changedEntry.categorias.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.categorias)];
    } else {
        changedEntry.categorias = [];
    }
    if (changedEntry.reparto) {
        changedEntry.reparto = Array.isArray(changedEntry.reparto) ? changedEntry.reparto.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.reparto)];
    } else {
        changedEntry.reparto = [];
    }


    changedEntry = await Collection.updateOne({ _id: req.params._id }, { $set: changedEntry })/*, (e) => {
        if (e)
            res.sendStatus(500);
        else*/
    res.sendStatus(200).send(changedEntry);
    /*});*/
};


// ========
// Read one
// ========
const readOne = async (req, res) => {
    const { _id } = req.params;
    let result = await Collection.findById(_id);
    result.view = result.view ? result.view + 1 : 1;
    await Collection.updateOne({ _id: _id }, { $set: { view: result.view } });
    res.send(result);
}

const likedOne = async (req, res) => {
    const { _id } = req.params;
    var result = await Collection.findById(_id);
    result.like = result.like ? result.like + 1 : 1;
    await Collection.updateOne({ _id: _id }, { $set: { like: result.like } });
    res.send(result);
};

var attrname = "portada";

router.post('/', config.multer.single(attrname), async function (req, res) {
    const find = {};
    find["name"] = req.body["name"];
    var doc = await Collection.findOne(find);
    let changedEntry = req.body;

    if (doc) {
        changedEntry._id = new ObjectID(doc._id);
    }

    if (changedEntry.categorias) {
        changedEntry.categorias = Array.isArray(changedEntry.categorias) ? changedEntry.categorias.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.categorias)];
    } else {
        changedEntry.categorias = [];
    }
    if (changedEntry.reparto) {
        changedEntry.reparto = Array.isArray(changedEntry.reparto) ? changedEntry.reparto.map(e => new ObjectID(e)) : [new ObjectID(changedEntry.reparto)];
    } else {
        changedEntry.reparto = [];
    }

    saveFile(req, changedEntry, res);




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


router.get('/:_id', readOne);
router.get('/all/:page', readMany);
router.post('/:_id/like', likedOne);
router.post('/all/:page', readMany);
router.put('/:_id', update);

module.exports = router;

