let mongoose = require('mongoose')

let fileSchema = new mongoose.Schema({
    name: String,
    updated: { type: Date, default: Date.now },
    url: String
}, { autoCreate: true })

module.exports = mongoose.model('File', fileSchema)