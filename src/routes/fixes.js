const express = require('express');
const {
    specialName,
    fullfixes
} = require('../controller/fixes');
const { loggerRequest } = require('../controller/logger');
let router = express.Router();

router.get("/specialnames", loggerRequest, specialName);
router.get("/fullfixes", loggerRequest, fullfixes);



module.exports = router;