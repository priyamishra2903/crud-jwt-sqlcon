cconst express=require('express')
const app=express.Router()
const fs=require('fs')
const {parse} = require("path");
const {middle} = require('./middle_ware')
const bcrypt = require('bcrypt')
const {to} = require('await-to-js')
const db = require("../config/database");
app.use(middle);
app.get('/', (req, res) => {

    try {
        let sql = "select * from student_data;"
        db.query(sql, (err, result) => {
            if (err) res.json({ success: false, error: "no database" });
            else res.json(result);
    } catch (err)
        {
        console.error(err.message);
        res.status(500).send('Server Error');

    }

});

module.exports = app;
