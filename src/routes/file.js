let fs = require('fs')
let express = require('express');
let router = express.Router();
var path = require('path');
var util = require('util');


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

function storeWithOriginalName(file) {
    let fullNewPath = path.join(file.destination, file.originalname);
    let rename = util.promisify(fs.rename);

    return rename(file.path, fullNewPath)
        .then(() => {
            return file.originalname
        })
}

module.exports = router;