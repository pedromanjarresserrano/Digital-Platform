
const express = require('express');

module.exports = (Collection, sortBy) => {
    const router = express.Router();
    const {
        create,
        readMany,
        readOne,
        readFindOne,
        update,
        remove
    } = require("../controller/crud");


    router.post('/', (req, res) => create(req, res, Collection));
    router.post('/all/:page', (req, res) => readMany(req, res, Collection, sortBy));
    router.get('/all/:page', (req, res) => readMany(req, res, Collection, sortBy));
    router.get('/:_id', (req, res) => readOne(req, res, Collection));
    router.post('/fo', (req, res) => readFindOne(req, res, Collection));
    router.put('/:_id', (req, res) => update(req, res, Collection));
    router.delete('/:_id', (req, res) => remove(req, res, Collection));

    return router;

};