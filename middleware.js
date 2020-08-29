colet express = require('express');
let router = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');

const salt = 'hellopriya';
const generateToken = (userData) => {
    let token = jwt.sign(userData, salt, { expiresIn: 200000000 });
    return token;
};

const passwordHash = async (password) => {
    const saltRounds = 12;
    const [err, passwordHash] = await to(bcrypt.hash(password, saltRounds));
    if (err) throw err;
    return passwordHash;
};


const verifyToken = (res, next, token) => {
    let data = jwt.verify(token, salt, (err, authData) => {
        if (err) res.json({ error: "Invalid token." });
        if (authData.email) {
            res.locals.email = authData.email;
            res.locals.id = authData.id;
            next();
        } else {
            return res.json({ success: false, error: "Invalid token" });
        }
    });
};
