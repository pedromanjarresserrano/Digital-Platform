const express = require('express');
const {
    specialName,
    fullfixes
} = require('../controller/fixes');
let router = express.Router();

router.get("/specialnames", specialName);
router.get("/fullfixes", fullfixes);



module.exports = router;
