const Seccions = require("../database/sequalize/models/config/seccions.model.js");


async function getSeccions(req, res) {
    try {
        let seccions = await Seccions.findAll();
        if (seccions.length > 0) {
            res.status(200).json(seccions);
        } else {
            res.status(404)
        }

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

async function saveSeccions(req, res) {
    let seccions = req.body;

    try {
        for(let sec of seccions){
            let seccionsNames = sec.seccionsNames;
            let grade = sec.grade;
            await Seccions.update({
                seccionsNames
            }, {
                where: {
                    grade
                }
            })
        };
      
        res.status(200).json({message:"Secciones actualizadas"});
        
    } catch (error) {
        console.log(error)
        res.status(500); 
    }
}

module.exports = {
    getSeccions,
    saveSeccions
}