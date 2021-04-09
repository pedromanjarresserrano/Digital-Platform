let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

let studioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    alias: {
        type: String,
        default: '',
        required: false,
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    image: {
        type: String,
        default: ""
    }
}, schemaOptions)

studioSchema.plugin(require('mongoose-autopopulate'));

studioSchema.pre("save", function(next) {
    if (this.name)
        this.name = this.name.trim();

    next();
});

studioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Studio', studioSchema)