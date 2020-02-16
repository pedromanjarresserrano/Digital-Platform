let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    updated: { type: Date, default: Date.now },
    url: String
}, { autoCreate: true })

locationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Location', locationSchema)