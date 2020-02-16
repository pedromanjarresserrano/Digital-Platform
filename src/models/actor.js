let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    updated: { type: Date, default: Date.now },
    aka: String,
    edad: Number,
    imageAvatar: String
}, { autoCreate: true })

actorSchema.plugin(require('mongoose-autopopulate'));

actorSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Actor', actorSchema)