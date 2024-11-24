let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

let sagaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    portada: {
        type: String,
        default: ""
    },
    parts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        autopopulate: true,
        default: []
    }],
}, schemaOptions)

sagaSchema.plugin(require('mongoose-autopopulate'));

sagaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Saga', sagaSchema)