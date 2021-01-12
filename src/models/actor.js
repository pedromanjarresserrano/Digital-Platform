let mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

let actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""

    },
    updated: { type: Date, default: Date.now },
    aka: {
        type: String,
        default: ""
    },
    edad: Number,
    imageAvatar: {
        type: String,
        default: ""
    },
    altura: {
        type: Number,
        default: 18
    },
    bio: {
        type: String,
        default: ""
    }
}, schemaOptions)

actorSchema.plugin(require('mongoose-autopopulate'));

actorSchema.plugin(mongoosePaginate);
actorSchema.pre("save", function(next) {
    if (this.name)
        this.name = this.name.trim();
    if (this.aka)
        this.aka = this.aka.trim();
    if (this.bio)
        this.bio = this.bio.trim();
    next();
});

const updateDate = (next) => {
    try {
        this.updated = Date.now;
        next();
    } catch (error) {
        return next(error);
    }
}

actorSchema.pre("update", updateDate);
actorSchema.pre("updateOne", updateDate);
actorSchema.pre("findOneAndUpdate", updateDate);
actorSchema.pre("save", updateDate);
actorSchema.pre("findOneAndUpdate", updateDate);

module.exports = mongoose.model('Actor', actorSchema)