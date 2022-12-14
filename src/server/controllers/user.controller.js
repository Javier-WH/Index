const Teacher = require("../database/sequalize/models/teachers/teachers.model")


async function getUserName(req, res){
    if(!req.session.teachersID){
        return;
    }
    try {
        let id =  req.session.teachersID;
        
        let teacher = await Teacher.findAll({where:{id}});

        let name = `${teacher[0].names} ${teacher[0].lastNames}`;
        let ci = teacher[0].ci
        res.json({name, id, ci});

    } catch (error) {
        res.status(500).json({error: "Ha ocurrido un error"});
    }
 
}


module.exports ={getUserName}