const express = require('express');
let router = express.Router();
const {
    authSign
} = require('../controller/auth');

router.post("/signin", authSign);



module.exports = router;
