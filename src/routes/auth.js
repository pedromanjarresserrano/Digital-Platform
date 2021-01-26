const express = require('express');
let router = express.Router();
const {
    authSign,
    validSign,
    tokenValidator
} = require('../controller/auth');
const { loggerRequest } = require('../controller/logger');

router.post("/signin", loggerRequest, authSign);
router.post("/revalidsignin", loggerRequest, tokenValidator, validSign);



module.exports = router;