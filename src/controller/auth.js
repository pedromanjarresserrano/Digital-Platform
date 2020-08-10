const express = require('express');
let router = express.Router();
const models = require('../models');
const users = models.usuariomodel;
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { Usuario } = require('../models').usuariomodel;



const authSign = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await users.findOne({ email });
        if (!user) return res.status(400).send("The data send not macth with any user");
        const match = user.comparePassword(password);
        if (!match) {
            return res.status(400).send({ message: "The data send not macth with any user" });
        }
        user.password = "true";
        const token = jwt.sign({ id: user._id }, process.env.SECRETTOKEN, {
            expiresIn: 60 * 60 * 24
        })
        user.token = token;
        res.send({ user, message: "The username and password combination is correct!" });
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
}

const tokenValidator = async (req, res, next) => {

    const token = req.headers["x-access-token"]
    if (!token)
        return res.status(401).json({ auth: false, msg: "token-invalid" })
    try {
        req.decoded = jwt.verify(token, process.env.SECRETTOKEN);
        const user = await Usuario.findOne({ _id: req.decoded })
        if (!user)
            return res.status(401).json({ auth: false, msg: "token-invalid" })
            
        next()
    } catch (error) {
        return res.status(401).json({ auth: false, msg: "token-invalid" })
    }

}

module.exports = {
    authSign,
    tokenValidator
};