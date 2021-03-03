let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const fs = require('fs')
const _ = require('underscore');

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

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
    created: { type: Date, default: Date.now },
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
    unique_views: [{
        type: String,
        default: []
    }],
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
    },
    files: [String]

}, schemaOptions)

const check = function(next) {
    if (this.name)
        this.name = this.name.trim();
    if (this.visualname)
        this.visualname = this.visualname.trim();
    if (this.description)
        this.description = this.description.trim();
    this.unique_views = _.uniq(this.unique_views);
    this.view = this.unique_views.length;
    next();
}


movieSchema.plugin(require('mongoose-autopopulate'));

movieSchema.plugin(mongoosePaginate);


movieSchema.pre("save", check);
movieSchema.pre("update", check);
movieSchema.pre("updateOne", check);
movieSchema.pre("findByIdAndUpdate", check);
movieSchema.pre("findOneAndUpdate", check);

movieSchema.pre("delete", (next) => {
    if (this.files) {
        this.files.forEach(e => {
            try {
                fs.unlinkSync("./" + e)
                    //file removed
            } catch (err) {
                console.error(err)
            }
        });
    }
    next();
});



module.exports = mongoose.model('Movie', movieSchema)