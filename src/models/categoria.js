let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

let categoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    image: String,
    imagenes: [String]
}, { autoCreate: true })

categoriaSchema.plugin(require('mongoose-autopopulate'));

categoriaSchema.plugin(mongoosePaginate);


const updateDate = (next) => {
    try {
        this.updated = Date.now;
        next();
    } catch (error) {
        return next(error);
    }
}

categoriaSchema.pre("update", updateDate);
categoriaSchema.pre("updateOne", updateDate);
categoriaSchema.pre("findOneAndUpdate", updateDate);
categoriaSchema.pre("save", updateDate);
categoriaSchema.pre("findOneAndUpdate", updateDate);

module.exports = mongoose.model('Categoria', categoriaSchema)