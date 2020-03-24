let mongoose = require('mongoose')
let validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2');
const Bcrypt = require("bcryptjs");

let usuarioSchema = new mongoose.Schema({
    name: String,
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
    imageAvatar: {
        type: String,
        default: ""
    }
}, { autoCreate: true })

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