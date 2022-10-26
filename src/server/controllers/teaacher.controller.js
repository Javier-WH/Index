const Teachers = require("../database/sequalize/models/teachers/teachers.model");
const Subjects = require("../database/sequalize/models/teachers/subjects.model");
const sequelize = require("../database/sequalize/connection.js");
/*
*regrresa los datos de un profesor
*/
async function getTeacherData(req, res) {
    let id = req.query.id;

    let teacher = await Teachers.findAll({
        where: {
            id
        }
    })

    if (teacher.length > 0) {

        res.json(teacher[0])

    } else {
        res.json({
            names: "Desconocido",
            lastNames: "Desconocido",
            ci: "Desconocido",
            gender: '"Desconocido"',
            email: "Desconocido",
            phone: "Desconocido",
            pass: "Desconocido",
        })
    }
}

/*
*actualiza los datos un profesor
*/
async function setTeacherData(req, res) {
    try {
        let data = req.body;
        let id = data.id;
        delete data.id;
        await Teachers.update(data, { where: { id } });
        res.json({ message: "OK" })
    } catch (error) {
        res.json({ error: "Ocurrió un erro desconocido al intentar actualizar los datos del profesor" })
    }
}


/*
*Inscribe un profesor
*/

async function insertTeacher(req, res) {
    const teacherTransaction = await sequelize.transaction();
    try {
        let { ci, names, lastNames, gender, birthdate, phone, email, admin, subjects } = req.body;

        //obtiene las materias del profesor enviadas desde el cliente
        let obj = {};
        subjects.map(item => {
            let subject = item.substring(0, item.length - 3)
            let grade = item.substring(item.length - 3)

            if (obj[subject] === undefined) {
                obj[subject] = [];
            }

            obj[subject].push(grade)
        })



        ///revisa si el profesor existe
        let teacherList = await Teachers.findAll({
            where: {
                ci
            },
            transaction: teacherTransaction
        })

        //si existe actualiza
        if (teacherList.length > 0) {
            let teacherId = teacherList[0].id

            await Teachers.update({
                names,
                lastNames,
                ci,
                gender,
                birthdate,
                phone,
                email,
                admin
            }, {
                where: {
                    id:teacherId
                },
                transaction: teacherTransaction
            })

            await Subjects.update({
                subjects: [obj]
            }, {
                where: { teacherId },
                transaction: teacherTransaction
            })

        } else {//si no existe crea uno nuevo

            let insertedTeacher = await Teachers.create({
                names,
                lastNames,
                ci,
                gender,
                birthdate,
                phone,
                email,
                admin
            }, { transaction: teacherTransaction })

            let teacherId = insertedTeacher.dataValues.id


            await Subjects.create({
                teacherId,
                subjects: [obj]
            }, { transaction: teacherTransaction })

        }

        teacherTransaction.commit()
        res.status(200).json({ message: "OK" })


    } catch (error) {
        teacherTransaction.rollback();
        console.log(error);
        res.status(500).json({ error: "Ha ocurrido un error al intentar registrar al profesor" })

    }

}

async function getTeacherByCi(req, res) {
    let ci = req.query.ci;

    try {
        let getTeacerTransaction = await sequelize.transaction();


        let teacherList = await Teachers.findAll({
            where: {
                ci
            },
            transaction: getTeacerTransaction
        })

        if (teacherList.length <= 0) {
            res.status(404).json({ error: "La cédula suministrada no está registrada" });
            return
        }

        let subjects = await Subjects.findAll({
            where: {
                teacherId: teacherList[0].id
            },
            transaction: getTeacerTransaction
        })

        let objSub = [];
        if (subjects.length > 0) {
            let rawSubjects = subjects[0].subjects[0];

            Object.keys(rawSubjects).map(r => {
                rawSubjects[r].map(sec => {
                    objSub.push(`${r} ${sec}`)
                })
            })
        }

        let data = teacherList[0].dataValues;
        data.subject = objSub;

        getTeacerTransaction.commit();
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        getTeacerTransaction.rollback();
        res.status(500).json({ error: "Ha ocurrido un error al momento de obtener al profesor" })
    }


}

module.exports = { getTeacherData, setTeacherData, insertTeacher, getTeacherByCi }