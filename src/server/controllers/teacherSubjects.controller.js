const path = require("path");
const Subjects = require("../database/sequalize/models/teachers/subjects.model")
const Teacher = require("../database/sequalize/models/teachers/teachers.model")

async function getTeacherSubjects(req, res){
    if(!req.session.teachersID){
        return
    }
    let id =  req.session.teachersID
    try {
        let subjects = await Subjects.findAll({where:{teacherId:id}});
        res.json(subjects[0].subjects)
    } catch (error) {
        res.json([]);
    }
}

module.exports = {getTeacherSubjects};