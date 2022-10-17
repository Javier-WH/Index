const Teachers = require("../database/sequalize/models/teachers/teachers.model")

/*
*
*
*
*
*
*regrresa los datos de un profesor
*/
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

/*
*
*
*
*
*
*actualiza los datos un profesor
*/

async function setTeacherData(req, res){
    try {
        let data = req.body;
        let id = data.id;
        delete data.id;
        await Teachers.update(data, {where: {id}});
        res.json({message: "OK"})
    } catch (error) {
        res.json({error: "Ocurrió un erro desconocido al intentar actualizar los datos del profesor"})
    }
}

module.exports = { getTeacherData, setTeacherData }