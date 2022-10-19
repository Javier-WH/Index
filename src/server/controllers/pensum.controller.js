const Pensum = require("../database/sequalize/models/config/pensum.model.js");


async function getPensum(schoolYear){
    let raw = await Pensum.findAll({where:{schoolYear}});
    
    let pensum = {}

    raw[0].subjects.map(subject=>{
        pensum[subject] = {
            lap1: 0,
            lap2: 0,
            lap3: 0,
            def: 0
        }
    })


    return pensum;

}

module.exports ={getPensum}