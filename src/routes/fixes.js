const express = require('express');
const {
    specialName,
    specialNameReparto
} = require('../controller/fixes');
let router = express.Router();

router.get("/specialnames", specialName);
router.get("/specialnamesfix", specialNameReparto);



module.exports = router;
