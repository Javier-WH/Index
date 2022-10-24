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

module.exports = { getPensum, getMatricula }