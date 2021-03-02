let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

let categoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        default: '',
        required: false,
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    image: String,
    imagenes: [String]
}, schemaOptions)

categoriaSchema.plugin(require('mongoose-autopopulate'));

categoriaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Categoria', categoriaSchema)