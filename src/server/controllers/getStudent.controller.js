const path = require("path");
const StudentList = require("../database/sequalize/models/studentList.model.js");
const Grades = require("../database/sequalize/models/grades.model.js")

function getApp(req, res) {
    res.sendFile(res.sendFile(path.join(__dirname, "../../client/app/index.html")))
}

async function getStudentList(req, res) {
    try {
        let rawList = await StudentList.findAll({
            include: {
                model: Grades,
                as: "grades",
                where: {
                    period: 2022
                }
            }
        })
        if(rawList.length > 0){
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
        }else{
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