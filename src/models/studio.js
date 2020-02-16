let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let studioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    updated: { type: Date, default: Date.now },
    image: String
}, { autoCreate: true })

studioSchema.plugin(require('mongoose-autopopulate'));

studioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Studio', studioSchema)