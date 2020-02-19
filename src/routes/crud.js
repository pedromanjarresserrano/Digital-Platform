
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose')
let config = require('../config/index')
let options = config.options;

module.exports = (Collection) => {

    // ======
    // Create
    // ======
    const create = async (req, res) => {
        let newEntry = req.body;
        newEntry = await Collection.create(newEntry)/*, (e, newEntry) => {
            if (e) {
                console.log(e);
                res.sendStatus(500);
            } else {*/
        res.send(newEntry);/*
            }
        });*/
    };

    // =========
    // Read many
    // =========
    const readMany = async (req, res) => {
        let query = req.body || {};
        query = Object.keys(query).length === 0 ? req.query : query;
        options.page = parseInt(req.params.page);
        debugger;
        if (options.page == -1) {
            let result = await Collection.find(query);/*, (e, result) => {
                if (e) {
                    res.status(500).send(e);
                    console.log(e.message);
                } else {*/
            res.send(result);
            /*}
        });*/
        } else {
            let result = await Collection.paginate(query, options)/*, (e, result) => {
                if (e) {
                    res.status(500).send(e);
                    console.log(e.message);
                } else { */
            res.send(result);
            /*}
        });*/
        }
    };

    // ========
    // Read one
    // ========
    const readOne = async (req, res) => {
        const { _id } = req.params;

        Collection.findById(_id, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                res.send(result);
            }
        });
    };
    // ========
    // Read Find one
    // ========
    const readFindOne = (req, res) => {
        let query = req.body || {};

        Collection.findOne(query, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                res.send(result);
            }
        });
    };

    // ======
    // Update
    // ======
    const update = async (req, res) => {
        let changedEntry = req.body;
        changedEntry = await Collection.updateOne({ _id: changedEntry._id }, { $set: changedEntry })/*, (e) => {
            if (e)
                res.sendStatus(500);
            else*/
        res.sendStatus(200);
        /*});*/
    };

    // ======
    // Remove
    // ======
    const remove = (req, res) => {
        Collection.deleteOne({ _id: req.params._id }, (e) => {
            if (e)
                res.status(500).send(e);
            else
                res.sendStatus(200);
        });
    };

    // ======
    // Routes
    // ======

    let router = express.Router();

    router.post('/', create);
    router.post('/all/:page', readMany);
    router.get('/all/:page', readMany);
    router.get('/:_id', readOne);
    router.post('/fo', readFindOne);
    router.put('/:_id', update);
    router.delete('/:_id', remove);

    return router;

}