let express = require('express');
let router = express.Router();

const { storeWithOriginalName } = require('../services/files');

var multer = require('multer')({
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