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

{
  ci: '123',
  names: 'Juan',
  lastNames: 'Perez',
  gender: 'm',
  birthdate: '2000-01-01',
  phone: '555',
  email: 'Juan@correoFalso.com',
  admin: true,
  subjects: [
    'Castellano 1A',
    'Inglés y otras lenguas extranjeras 1A',
    'Castellano 1B',
    'Inglés y otras lenguas extranjeras 1B',
    'Física 5C'
  ]
}

*/

async function insertTeacher(req, res) {
    const teacherTransaction = await sequelize.transaction();
    try {
        let { ci, names, lastNames, gender, birthdate, phone, email, admin, subjects } = req.body;
       
        let insertedTeacher = await Teachers.create({
            names,
            lastNames,
            ci,
            gender,
            birthdate,
            phone,
            email,
            admin
        }, {transaction: teacherTransaction })

        let teacherId = insertedTeacher.dataValues.id

        let obj = {};
        subjects.map(item=>{
            let subject = item.substring(0, item.length -3)
            let grade = item.substring(item.length -3)

            if(obj[subject] === undefined){
                obj[subject] = [];
            }

            obj[subject].push(grade)
        })

        await Subjects.create({
            teacherId,
            subjects: [obj]
        }, {transaction: teacherTransaction })

        
        teacherTransaction.commit()
        res.status(200).json({ message: "OK" })
    } catch (error) {
        teacherTransaction.rollback();
        console.log(error);
        res.status(500).json({ error: "Ha ocurrido un error al intentar registrar al profesor" })

    }

}

module.exports = { getTeacherData, setTeacherData, insertTeacher }