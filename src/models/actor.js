let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""

    },
    updated: { type: Date, default: Date.now },
    aka: {
        type: String,
        default: ""
    },
    edad: Number,
    imageAvatar: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    }
}, { autoCreate: true })

actorSchema.plugin(require('mongoose-autopopulate'));

actorSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Actor', actorSchema)