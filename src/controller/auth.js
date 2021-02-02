const models = require('../models');
const users = models.usuariomodel;
const jwt = require('jsonwebtoken');

const secret = process.env.SECRETTOKEN || "secret";

const authSign = async(req, res) => {
    try {
        const { email, password } = req.body;
        let user = await users.findOne({ email });
        if (!user) return res.status(400).send("The data send not macth with any user");
        if (!password) {
            return res.status(400).send({ message: "The data send not macth with any user" });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.status(400).send({ message: "The data send not macth with any user" });
        }
        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 60 * 60 * 24
        })
        res.send({
            user: {
                email: user.email,
                name: user.name,
                imageAvatar: user.imageAvatar,
                token: token,
                password: "true"
            },
            message: "The username and password combination is correct!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
}

const validSign = async(req, res) => {
    const user = req.user;
    user.password = "true";
    const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 60 * 60 * 24
    })

    res.send({
        user: {
            email: user.email,
            name: user.name,
            imageAvatar: user.imageAvatar,
            token: token,
            password: "true"
        },
        message: "New token generated"
    });
}

const tokenValidator = async(req, res, next) => {

    const token = req.headers["x-access-token"]
    if (!token)
        return res.status(401).json({ auth: false, msg: "token-invalid" })
    try {
        req.decoded = await jwt.verify(token, secret);
        console.log(req.decoded);
        const user = await users.findOne({ _id: req.decoded.id })
        if (!user)
            return res.status(401).json({ auth: false, msg: "token-invalid" })
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ auth: false, msg: "token-invalid" })
    }

}

module.exports = {
    authSign,
    tokenValidator,
    validSign
};