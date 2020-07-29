let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

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
}, { autoCreate: true })

locationSchema.plugin(mongoosePaginate);


const updateDate = (next) => {
    try {
        this.updated = Date.now;
        next();
    } catch (error) {
        return next(error);
    }
}

locationSchema.pre("update", updateDate);
locationSchema.pre("updateOne", updateDate);
locationSchema.pre("findOneAndUpdate", updateDate);
locationSchema.pre("save", updateDate);
locationSchema.pre("findOneAndUpdate", updateDate);

module.exports = mongoose.model('Location', locationSchema)