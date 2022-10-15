const path = require("path");
const Subjects = require("../database/sequalize/models/teachers/subjects.model")


async function getTeacherSubjects(req, res){
    /*let id =  req.session.teachersID;
    try {
        let subjects = await Subjects.findAll({
            where:{
                id
            }
        });
        
        res.send(subjects);

    } catch (error) {
       
    }

   */

    res.json( 
        [
            {
                "Matemática": ["1A", "1B", "4A"],
                "Física": ["3A", "4B"],
                "Ingles": ["2A", "3A"],
                "Deporte": ["2A", "3A"]
            }
        ]
    )



}

module.exports = {getTeacherSubjects};