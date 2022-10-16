const Teachers = require("../database/sequalize/models/teachers/teachers.model")

async function getTeacherData(req, res) {
    let id = req.query.id;

    let teacher = await Teachers.findAll({
        where: {
            id
        }
    })

    if(teacher.length >0){

        res.json(teacher[0])
    
    }else{
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

module.exports = { getTeacherData }