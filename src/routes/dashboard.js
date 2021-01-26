const {
    getDashMovieInfo,
    getDashActorsInfo
} = require("../controller/dashboard");
const express = require('express');
const { loggerRequest } = require("../controller/logger");
const router = express.Router();


router.get('/movies', loggerRequest, getDashMovieInfo);
router.get('/actors', loggerRequest, getDashActorsInfo);



module.exports = router;