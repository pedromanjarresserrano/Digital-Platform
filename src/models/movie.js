let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let movieSchema = new mongoose.Schema({
    visualname: String,
    name: {
        type: String,
        required: true,
    },
    updated: { type: Date, default: Date.now },
    url: String,
    duration: Number,
    description: String,
    like: Number,
    view: Number,
    size: Number,
    year: Number,
    quality: String,
    processed: Boolean,
    director: String,
    guion: String,
    reparto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        autopopulate: true
    }],
    studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        autopopulate: true
    },
    categorias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        autopopulate: true
    }],
    portada: String
}, { autoCreate: true })

movieSchema.plugin(require('mongoose-autopopulate'));

movieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', movieSchema)