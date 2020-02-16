let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let categoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    updated: { type: Date, default: Date.now },
    image: String,
    imagenes: [String]
}, { autoCreate: true })

categoriaSchema.plugin(require('mongoose-autopopulate'));

categoriaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Categoria', categoriaSchema)