const EvalPlan = require("../database/sequalize/models/teachers/teacherEvalPlan.model")

async function saveEvalplanData(req, res){

    try {
        
        let ask = await EvalPlan.findAll({
            where:{
                teacherId: req.body.teacherId,
                subjecName: req.body.subjecName,
                grade: req.body.grade,
                seccionName: req.body.seccionName
            }
        })
        //evalPlan
        if(ask.length === 0){
            //inserta plan
            await EvalPlan.create(req.body)
        }else{
            //actualiza plan
            await EvalPlan.update({
                evalPlan: req.body.evalPlan
            },{
                where:{
                    teacherId: req.body.teacherId,
                    subjecName: req.body.subjecName,
                    grade: req.body.grade,
                    seccionName: req.body.seccionName
                }
            })
        }

        res.status(200).json({messaje:"OK"});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Ocurrió un error al intentar guardar en plan de evaluación"})
    }

}

async function getEvalPlan(req, res){

    try {
   
        let pullEvalPlan = await EvalPlan.findAll({
            where:{
                teacherId: req.body.teacherId,
                subjecName: req.body.subjecName,
                grade: req.body.grade,
                seccionName: req.body.seccionName
            }
        })
        if(pullEvalPlan.length > 0){
            res.status(200).json(pullEvalPlan[0].evalPlan);
        }else{
            res.status(404).json({message:"No existe tal plan de evaluacion"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Ocurrió un error al intentar obtener el plan de evaluación"})
    }
    
}

module.exports ={
    saveEvalplanData,
    getEvalPlan
}