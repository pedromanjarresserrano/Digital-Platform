const {
    getDashMovieInfo,
    getDashActorsInfo
} = require("../controller/dashboard");
const express = require('express');
const router = express.Router();


router.get('/movies', getDashMovieInfo);
router.get('/actors', getDashActorsInfo);



module.exports = router;