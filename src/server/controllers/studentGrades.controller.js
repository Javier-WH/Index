const Grades = require("../database/sequalize/models/students/grades.model.js");

function saveGrades(req, res) {

    try {
        let data = req.body;
        let keys = Object.keys(data);

        let changesList = keys.map(key => {
            return data[key]
        })

        changesList.map(async change => {

            let id = change.id;

            let seccionData = change.session.replaceAll("  ", " ");
            let schoolYear = seccionData[seccionData.length - 2]
            let section = seccionData[seccionData.length - 1]
            let subject = seccionData.substring(0, seccionData.length - 3)
                 
           /* let subject = change.session.split(" ")[0];
            let section = change.session.split(" ")[1][1];
            let schoolYear = change.session.split(" ")[1][0];
            */

            let query = await Grades.findAll({
                where: {
                    studentId: id,
                    section,
                    schoolYear,
                    period: 2022
                }
            });
            let oldSubjects = query[0].subjects;

            let oldSubject = oldSubjects[subject]

            if (change.l1) {
                oldSubject.lap1 = change.l1
            }
            if (change.l2) {
                oldSubject.lap2 = change.l2
            }
            if (change.l3) {
                oldSubject.lap3 = change.l3
            }


            oldSubject.def = ((Number.parseFloat(oldSubject.lap1) + Number.parseFloat(oldSubject.lap2) + Number.parseFloat(oldSubject.lap3)) / 3).toFixed(2);

            await Grades.update({
                subjects: oldSubjects
            }, {
                where: {
                    studentId: id,
                    section,
                    schoolYear,
                    period: 2022
                }
            })

        })

        res.json({ message: "OK" })
    } catch (error) {
        console.log(error)
        res.json({ error: "Ocurrió un error al intentar actualizar las notas" })
    }
}



module.exports = { saveGrades }