let mongoose = require('mongoose')
let validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2');
const Bcrypt = require("bcryptjs");

const schemaOptions = {
    autoCreate: true,
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
}

let usuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    imageAvatar: {
        type: String,
        default: ""
    }
}, schemaOptions)

usuarioSchema.plugin(require('mongoose-autopopulate'));

usuarioSchema.plugin(mongoosePaginate);

usuarioSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

usuarioSchema.methods.comparePassword = async function (plaintext) {
    return await Bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema)