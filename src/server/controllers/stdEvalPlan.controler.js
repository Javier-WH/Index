const StdEval = require("../database/sequalize/models/students/stdEvalPlan.model");

async function saveStdEval(req, res){
    let {stdid, stdGrades, section, schoolYear, failded, status} = req.body
    
    try {

        let pull = await StdEval.findAll({
            where:{
                section,
                schoolYear,
                stdid
            }
        })

        if(pull.length > 0){
            await StdEval.update({
                stdGrades
            },{
                where:{
                    section,
                    schoolYear,
                    stdid
                }
            })

        }else{

            await StdEval.create({
                stdid,
                stdGrades,
                section,
                schoolYear,
                failded,
                status
            })
        }

        res.status(200).json({message:"Los datos fueron guardados satisfactoriamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Ocurrió un error al intentar guardar el pensum"})

    }

    res.status(200);
}


/////////////////////////////////


async function getStdEval(req, res){

    try {
        let {section, schoolYear, stdid} = req.body;

        let pull = await StdEval.findAll({
            where:{
                section,
                schoolYear,
                stdid
            }
        })

        res.status(200).json(pull)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"ocurrio un error"})
        
    }


}

module.exports ={
    saveStdEval,
    getStdEval
}
