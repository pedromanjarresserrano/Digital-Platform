let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

let locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    url: {
        type: String,
        default: ""
    }
}, schemaOptions)

locationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Location', locationSchema)