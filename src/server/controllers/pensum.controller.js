const Pensum = require("../database/sequalize/models/config/pensum.model.js");


async function getPensum(schoolYear) {
    try {
        let raw = await Pensum.findAll({ where: { schoolYear } });

        let pensum = {}

        raw[0].subjects.map(subject => {
            pensum[subject] = {
                lap1: 0,
                lap2: 0,
                lap3: 0,
                def: 0
            }
        })

        return pensum;

    } catch (error) {
        console.log(error.message)
        return ["error"]
    }

}

async function getMatricula(req, res) {

    try {
        let pensum = await Pensum.findAll();

        if(pensum.length <= 0){
            res.status(404).json({message:"No se ha encontrado una matricula"})
        }

        res.status(200).json(pensum)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: "Ha ocurrido un erro al intentar obtener la matricula"})
    }
    
}

async function updatePensum(req, res){
    let subjectsList = req.body;
    //console.log(subjectsList)
    try {
        for(let sub of subjectsList){
            let subjects = sub.subjects;
            let schoolYear = sub.schoolYear;
            await Pensum.update({
                subjects
            }, {
                where: {
                    schoolYear
                }
            })
        };
      
        res.status(200).json({message:"Pensum Actualizado"});
        
    } catch (error) {
        console.log(error)
        res.status(500); 
    }

}


module.exports = { getPensum, getMatricula, updatePensum }