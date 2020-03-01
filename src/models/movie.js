let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let movieSchema = new mongoose.Schema({
    visualname: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
        default: ""
    },
    updated: { type: Date, default: Date.now },
    url: {
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    like: {
        type: Number,
        default: 0
    },
    view: {
        type: Number,
        default: 0
    },
    size: {
        type: Number,
        default: 0
    },
    year: {
        type: Number,
        default: 0
    },
    quality: {
        type: String,
        default: ""
    },
    processed: Boolean,
    director: {
        type: String,
        default: ""
    },
    guion: {
        type: String,
        default: ""
    },
    reparto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        autopopulate: true,
        default: []
    }],
    studio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        autopopulate: true
    },
    categorias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        autopopulate: true,
        default: []
    }],
    portada: {
        type: String,
        default: ""
    }
}, { autoCreate: true })

movieSchema.plugin(require('mongoose-autopopulate'));

movieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', movieSchema)