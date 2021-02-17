let config = require('../config/index');
let options = config.options;

// ======
// Create
// ======
const create = async(req, res, Collection) => {
    let newEntry = req.body;
    try {
        newEntry = await Collection.create(newEntry);
        res.send(newEntry);
    } catch (error) {
        res.status(502).send(error);
    }
};

// =========
// Read many
// =========
const readMany = async(req, res, Collection, sortBy) => {
    try {
        let query = req.body || {};
        query = Object.keys(query).length === 0 ? req.query : query;
        options.page = parseInt(req.params.page);
        if (options.page === -1) {
            let result = await Collection.find(query).sort(sortBy);
            res.send(result);
        } else {
            if (sortBy)
                options.sort = sortBy;
            let result = await Collection.paginate(query, options);
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }

};

// ========
// Read one
// ========
const readOne = async(req, res, Collection) => {
    const { _id } = req.params;
    try {
        let doc = await Collection.findById(_id);
        res.send(doc);
    } catch (error) {
        res.status(502).send(error);
    }
};
// ========
// Read Find one
// ========
const readFindOne = async(req, res, Collection) => {
    let query = req.body || {};
    try {
        let doc = await Collection.findOne(query);
        res.send(doc);
    } catch (error) {
        res.status(502).send(error);
    }
};

// ======
// Update
// ======
const update = async(req, res, Collection) => {
    let changedEntry = req.body;
    try {
        await Collection.findByIdAndUpdate({ _id: changedEntry._id }, { $set: changedEntry });
        res.sendStatus(200);
    } catch (error) {
        res.status(502).send(error);
    }
};

// ======
// Remove
// ======
const remove = async(req, res, Collection) => {
    try {
        await Collection.deleteOne({ _id: req.params._id });
        res.sendStatus(200);
    } catch (error) {
        res.status(502).send(error);
    }



};

// ======
// Export
// ======



module.exports = {
    create,
    readMany,
    readOne,
    readFindOne,
    update,
    remove
}