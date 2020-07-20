const express = require('express');
const router = express.Router();

const { storeWithOriginalName } = require('../services/files');

const multer = require('multer')({
    dest: 'public/uploads'
});


router.post('/', multer.single('attachment'), function (req, res, next) {
    return storeWithOriginalName(req.file)
        .then(encodeURIComponent)
        .then(encoded => {
            res.redirect(`/uploads/${encoded}`)
        })
        .catch(next)
});



module.exports = router;