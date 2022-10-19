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
            let subject = change.session.split(" ")[0];
            let section = change.session.split(" ")[1][1];
            let schoolYear = change.session.split(" ")[1][0];


            let query = await Grades.findAll({
                where: {
                    studentId: id,
                    section,
                    schoolYear
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
            if (change.def) {
                oldSubject.def = change.def
            }

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
        res.json({ error: "Ocurrió un error al intentar actualizar las notas" })
    }
}



module.exports = { saveGrades }