let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const fs = require('fs')

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

let imagesetSchema = new mongoose.Schema({
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
    pages: {
        type: Number,
        default: 0
    },
    year: {
        type: Number,
        default: 0
    },
    processed: Boolean,
    writer: {
        type: String,
        default: ""
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

imagesetSchema.plugin(require('mongoose-autopopulate'));

imagesetSchema.plugin(mongoosePaginate);
imagesetSchema.pre("save", function(next) {
    if (this.name)
        this.name = this.name.trim();
    if (this.visualname)
        this.visualname = this.visualname.trim();
    if (this.description)
        this.description = this.description.trim();
    next();
});

imagesetSchema.pre("delete", (next) => {
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


module.exports = mongoose.model('ImageSet', imagesetSchema)