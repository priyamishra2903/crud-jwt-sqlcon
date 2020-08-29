let express = require('express');
let app = express();
let courses = require('./routes/courses');
let users = require('./routes/users');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/courses', courses);
app.use('/api/students', users);
app.listen(3000, (err) => {
    if (err)
        console.log(err);
    else console.log("server started running at 5030")
})
