const express = require('express');
const app = express();
let bodyParser = require('body-parser');
const router = express.Router();
const PORT = 80
// app.use(cors());

let student = {
    list: [
        { "id": 615512053, "name": "Winnie", "surname": 20,"major": "CoE","GPA": 2.12 },
        { "id": 615512011, "name": "Pooh", "surname": 66,"major": "CoE","GPA": 2.12}]
}

app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

router.route('/student')
    .get((req, res) => res.json((student.list)))
    .post((req, res) => {
        let id = req.body.id
        let name = req.body.name
        let surname = req.body.surname
        let major = req.body.major
        let gpa = req.body.gpa
        student = { list: [...student.list, { id, name, surname,major,gpa }] }
        res.json((student.list))
    })

router.route('/student/:student_id')
  
    .get((req, res) => {
        let id = student.list.findIndex((item) => (item.id === +req.params.student_id))
        res.json(student.list[id])
    })
    .put((req, res) => {
        let id = student.list.findIndex((item) => (item.id === +req.params.student_id))
        let name = req.body.name
        let surname = req.body.surname
        let major = req.body.major
        let gpa = req.body.gpa
        if (id >= 0)
            student.list[id] = { ...student.list[id], name, surname,major,gpa }
        res.json(student.list[id])
    })
    .delete((req,res) => {
       student.list = student.list.filter(item => item.id !== +req.params.student_id)
       res.json(student.list)

    })
    router.route('/student/:not_student')
  
    .get((req, res) => {
        let id = student.list.findIndex((item) => (item.id === +req.params.not_student))
        if(id<=0)
        console.log("Hello");
    })
       

app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log('server is running...'))

