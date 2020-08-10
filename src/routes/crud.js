
const express = require('express');
const { tokenValidator } = require('../controller/auth');
const { loggerRequest } = require('../controller/logger');

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


    router.post('/', loggerRequest, tokenValidator, (req, res) => create(req, res, Collection));
    router.post('/all/:page', loggerRequest, (req, res) => readMany(req, res, Collection, sortBy));
    router.get('/all/:page', loggerRequest, (req, res) => readMany(req, res, Collection, sortBy));
    router.get('/:_id', loggerRequest, (req, res) => readOne(req, res, Collection));
    router.post('/fo', loggerRequest, (req, res) => readFindOne(req, res, Collection));
    router.put('/:_id', loggerRequest, tokenValidator, (req, res) => update(req, res, Collection));
    router.delete('/:_id', loggerRequest, tokenValidator, (req, res) => remove(req, res, Collection));

    return router;

};