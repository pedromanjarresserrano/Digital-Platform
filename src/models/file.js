let mongoose = require('mongoose')

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

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
}, schemaOptions)

module.exports = mongoose.model('File', fileSchema)