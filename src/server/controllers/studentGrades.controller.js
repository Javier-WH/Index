//const Grades = require("../database/sequalize/models/students/grades.model.js");

function saveGrades(req, res) {
    let data = req.body;
    console.log(data);
    res.json({ message: "OK" })
}



module.exports = { saveGrades }