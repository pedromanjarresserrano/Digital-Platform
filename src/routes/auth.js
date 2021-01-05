const express = require('express');
let router = express.Router();
const {
    authSign,
    validSign,
    tokenValidator
} = require('../controller/auth');

router.post("/signin", authSign);
router.post("/revalidsignin", tokenValidator, validSign);



module.exports = router;