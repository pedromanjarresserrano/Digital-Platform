const express = require('express');
const { tokenValidator } = require('../controller/auth');
const {
    specialName,
    fullfixes
} = require('../controller/fixes');
const { loggerRequest } = require('../controller/logger');
let router = express.Router();

router.get("/specialnames", loggerRequest, tokenValidator, specialName);
router.get("/fullfixes", loggerRequest, tokenValidator, fullfixes);



module.exports = router;