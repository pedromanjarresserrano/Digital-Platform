const path = require('path');
const util = require('util');
const fs = require('fs');
const mime = require('mime-types')


function saveFile(file, doc, collection) {
    if (file) {
        storeWithName(file, doc._id.toString())
        updateDoc(doc, collection);
    }

}

async function updateDoc(doc, Collection) {
    return await Collection.findByIdAndUpdate({ _id: doc._id }, { $set: doc }, { upsert: true, 'new': true })
}


function storeWithName(file, name) {
    var fullNewPath = path.join(file.destination, name + '.' + mime.extension(file.mimetype))
    var rename = util.promisify(fs.rename)
    rename(file.path, fullNewPath)
}

function storeWithOriginalName(file) {
    let fullNewPath = path.join(file.destination, file.originalname);
    let rename = util.promisify(fs.rename);

    return rename(file.path, fullNewPath)
        .then(() => {
            return file.originalname
        })
}

module.exports = {
    saveFile,
    updateDoc,
    storeWithName,
    storeWithOriginalName
}