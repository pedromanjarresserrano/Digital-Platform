const path = require('path');
const util = require('util');
const fs = require('fs');


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
    var fullNewPath = path.join(file.destination, name)
    var rename = util.promisify(fs.rename)
    rename(file.path, fullNewPath)
}

module.exports = {
    saveFile,
    updateDoc,
    storeWithName
}