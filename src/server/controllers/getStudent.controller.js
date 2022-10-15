const path = require("path");
const StudentList = require("../database/sequalize/models/students/studentList.model.js");
const Grades = require("../database/sequalize/models/students/grades.model.js")

function getApp(req, res) {
    res.sendFile(res.sendFile(path.join(__dirname, "../../client/views/app.html")))
}

async function getStudentList(req, res) {
    try {
        let seccionData = req.query.seccion.split(" ");
        let schoolYear = seccionData[1][0];
        let seccion = seccionData[1][1];

        let rawList = await StudentList.findAll({
            include: {
                model: Grades,
                as: "grades",
                where: {
                    period: 2022,
                    section:seccion,
                    schoolYear
                }
            }
        })
        
        if (rawList.length > 0) {
            let list = rawList.map(register => {
                let student = {
                    ci: register.ci,
                    names: register.names,
                    lastNames: register.lastNames,
                    id: register.id,
                    photo: "default",
                    subjects: register.grades[0].subjects
                };
                return student;
            });

            res.json(list);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json([]);
    }
}

module.exports = {
    getApp,
    getStudentList
}


/*
{
                "Matemática":{
                    "lap1": "18",
                    "lap2": "19",
                    "lap3": "20",
                    "def": "19"
                },"Física":{
                    "lap1": "12",
                    "lap2": "16",
                    "lap3": "14",
                    "def": "13"
 }


*/