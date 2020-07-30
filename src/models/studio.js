let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let studioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    image: {
        type: String,
        default: ""
    }
}, { autoCreate: true })

studioSchema.plugin(require('mongoose-autopopulate'));


const updateDate = (next) => {
    try {
        this.updated = Date.now;
        next();
    } catch (error) {
        return next(error);
    }
}

studioSchema.pre("update", updateDate);
studioSchema.pre("updateOne", updateDate);
studioSchema.pre("findOneAndUpdate", updateDate);
studioSchema.pre("save", updateDate);
studioSchema.pre("findOneAndUpdate", updateDate);

studioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Studio', studioSchema)