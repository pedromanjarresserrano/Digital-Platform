let mongoose = require('mongoose')

let fileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    updated: { type: Date, default: Date.now },
    url: {
        type: String,
        default: ""
    }
}, { autoCreate: true })

module.exports = mongoose.model('File', fileSchema)