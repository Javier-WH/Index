const Grades = require("../database/sequalize/models/students/grades.model.js");
const Config = require("../database/sequalize/models/config/config.model");
const {getSchoolYear, getSeccionName, getSubjectName} = require("../libraries/translateSeccionData")


async function saveGrades(req, res) {

    try {

        let askCofig = await Config.findAll();
        let config = askCofig[0];
        let allowedLap1 = config.lap1;
        let allowedLap2 = config.lap2;
        let allowedLap3 = config.lap3;
        let allowedEdit = config.edit;


        ///////////////////////
        let data = req.body;
        let keys = Object.keys(data);

        let changesList = keys.map(key => {
            return data[key]
        })

///////hgh
        changesList.map(async change => {

            let id = change.id;

            let seccionData = change.session.replace("  ", " ");
           // let schoolYear = seccionData[seccionData.length - 2]
           // let section = seccionData[seccionData.length - 1]
           // let subject = seccionData.substring(0, seccionData.length - 3)
            let schoolYear = getSchoolYear(seccionData);
            let section = getSeccionName(seccionData);
            let subject = getSubjectName(seccionData);

            let query = await Grades.findAll({
                where: {
                    studentId: id,
                    section,
                    schoolYear,
                    period: config.period
                }
            });
            let oldSubjects = query[0].subjects;

            let oldSubject = oldSubjects[subject]


            if (change.l1 && allowedLap1) {
                if(oldSubject.lap1 > 0 && !allowedEdit){
                    return
                }
                oldSubject.lap1 = change.l1
            }
            if (change.l2 && allowedLap2) {
                if(oldSubject.lap2 > 0 && !allowedEdit){
                    return
                }
                oldSubject.lap2 = change.l2
            }
            if (change.l3 && allowedLap3) {
                if(oldSubject.lap3 > 0 && !allowedEdit){
                    return
                }
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

 
        res.json({message: "OK"})
    } catch (error) {
        console.log(error)
        res.json({ error})
    }
}



module.exports = { saveGrades }