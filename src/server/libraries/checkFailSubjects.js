const Student = require("../database/sequalize/models/students/studentList.model");
const Grades = require("../database/sequalize/models/students/grades.model");

async function checkFailed(ci, schoolYear){
    try {
        schoolYear --;

        if(schoolYear == 0){

            return {message: "nuevo ingreso", code: 0}
        }

        let student = await Student.findAll({
            where:{ci}
        });

        if(student.length <= 0){
            return {message: "usuario no encontrado", code: 0}
        }

        let grades = await Grades.findAll({
            where:{
                studentId: student[0].id,
                schoolYear
            }
        });

        let subjects = grades[grades.length-1].subjects;

        let list = Object.keys(subjects);

        let failed =  list.filter(subjec => subjects[subjec].def < 10)
        
        let response = {
            message:"liso",
            code: 1,
            grade: schoolYear
        };

        if(failed.length > 0){
            response.message = "Pendiente";
            response.code = 2;
            response.extraSubjects = failed;
        }

        if(failed.length >= 3){
            response.message = "Repite";
            response.code = 3;
            response.extraSubjects = "Todas";
        }

        return response;
    } catch (error) {
        console.log(error.message)
    }

    

}

module.exports = {checkFailed};