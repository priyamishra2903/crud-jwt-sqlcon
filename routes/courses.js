let express = require('express');
let app = express.Router();
const bcrypt = require('bcrypt')
const {to} = require('await-to-js')
const middle = require("../middleware");
const db = require("../config/database");
app.use(middle);
app.get('/', (req, res) => {
    try {
        let sql = "select * from courses_data";
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
    }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
})

app.get("/:id", (req, res) => {
    let sql = `select * from courses_data where id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: "error occured" });
        } else if (result.length == 0) {
            res
                .status(400)
                .json({ error: `No course in database ${req.params.id}` });
        } else res.json(result);
    });
});

app.post('/', (req, res) => {
    try {
        let name = req.body.name;
        const description = req.body.description;
        const availableSlots = req.body.availableSlots;
        let availableslots = req.body.availableslots;

        if (!name || !availableslots) {
            return res.status(400).json({ error: "some details are missing" })
        }

    {

        if (res.locals.email === "priya@system.com") {
                let course = {
                    name: name,
                    description: description,
                    available_seats: available_seats,
                };
                let sql = "insert into courses set ?";
                console.log(result);
                res.json({ success: true });
        } else {
            courses.push({ id, name, availableslots });
            res.json({ success: true })

        }

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})



app.post('/:id/enroll', (req, res) => {

        try {
            let courses;

            try{
                let sql = db.executeQuery(`select  * from course_data where id = ${req.params.id}`)
                await promise.then( function (result){
                    curr_course = result[0]
                })
            } catch (err) {
                return res.json({"Data":null, "Error": err})
            }

            if (!courses) {
                return res.json({ "Error": 'No course in the database available!'})
            }

            try{
                let sql = db.executeQuery(`select  * from enrollment_data where course_id = ${course_data.id} and student = "${req.student_data.name}"`)
                await promise.then( function (result){
                    if (result[0]){
                        throw 'Student is already enrolled in the similar course!'
                    }
                })
            } catch (err) {
                return res.json({"Data":null, "Error": err})
            }

            try{
                let promise = db.executeQuery(`select availableSlots from courses where id = ${course_data.id}`)
                await promise.then( function (result){
                    if (result[0]['availableSlots']<1){
                        throw 'No slots available!'
                    }
                })
            } catch (err) {
                return res.json({"Data":null, "Error": err})
            }

            try{
                db.executeQuery(`insert into enrollement values( ${course_data.id}, "${req.student_data.name}")`)
            } catch (err) {
                return res.json({"Data":null, "Error": err})
            }

            try{
                db.executeQuery(`update courses set availableSlots = availableSlots - 1 where id = ${course_data.id}`)
            } catch (err) {
                return res.json({"Data":null, "Error": err})
            }

            return res.json({"Success": "Student enrolled"})

        } catch (err) {
            res.json({
                'Data':null,
                'Error': err
            })
        }
    })


app.put('/:id/deregister', (req, res) => {
    try {
        let promise = db.executeQuery(`select  * from course_data where id = ${req.params.id}`)
        await promise.then( function (result){
            curr_course = result[0]
        });
        if (!course_data)
            return res.json({ error: "this course is currently not present" });

        if (!student_data)
            return res.json({ error: "student id doesn't exist" });
         let sql= db.executeQuery(` delete from enrollement_data where student = "${req.student_data.name}" and course_id = ${req.params.id}`)

    } catch (err) {
        console.error(err.message);
        return res.json({ success: true })
    }
})
module.exports = app;