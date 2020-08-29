let express = require('express');
let router = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const db = require("../config/database");

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

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let sql = `select * from students where email = '${email}'`;
    db.query(sql, async (err, result) => {
        if (err) res.json({ error: "error in query" });
        else {
            if (result.length > 0) {
                const [err, isValidPassword] = await to(
                    bcrypt.compare(password, result[0].password)
                );
                if (isValidPassword) {
                    const student = {
                        id: result[0].id,
                        name: result[0].name,
                        email: email,
                    };
                    return res.json({
                        success: true,
                        token: generateToken(student),
                        error: null,
                    });
                } else{


                    res.json({
                        success: false,
                        msg: "Incorrect password",
                    });
                }

    }
    else {

                res.json({ status: false, msg: "no such email exits" });
            }
        }

    });
});
const validateSignupPayload = (name, email, password) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!name || !email || !password) {
        return false;
    } else if (email.match(mailformat)) {
        return true;
    } else {
        return false;
    }
};
router.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!validateSignupPayload(name, email, password)) {
        return res.status(403).json({ error: "Invalid Payload" });
    } else {
        let student = {
            name: name,
            email: email,
            password: await passwordHash(password),
        };
        let sql = `insert into students set ?`;
        db.query(sql, student, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    res.json({ success: false, error: "This email already exist." });
                } else {
                    res.json({ success: false, error: "Some error" });
                }
            } else {
                res.json({ success: true });
            }
        });
    }
});

module.exports = router;