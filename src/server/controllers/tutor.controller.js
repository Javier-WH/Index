const Tutor = require("../database/sequalize/models/students/studentTutor.model.js");
const sequelize = require("../database/sequalize/connection.js");

async function registerTutor(req, res){
    const insertTutor = await sequelize.transaction();
    try {
        let data = req.body;
        let tutorCi = data.tutorCi;

        let tutorList = await Tutor.findAll({
            where:{
                tutorCi
            },
            transaction: insertTutor
        })

        if(tutorList.length > 0){
            await Tutor.update(data, {
                where:{
                    tutorCi
                },
                transaction: insertTutor
            })
        }else{
            await Tutor.create(data , {transaction: insertTutor});
        }

        await insertTutor.commit();
        res.status(200).json({message: "OK"});
    } catch (error) {
        console.log(error);
        await insertTutor.rollback();
        res.status(500).json({error: "Ocurrió un error al intentar inscribir al tutor"});
    }
}
//////////////

async function getTutor(req, res){
    try {
        let tutorCi = req.query.ci;

        let tutorList = await Tutor.findAll({
            where:{
                tutorCi
            }
        })

        if(tutorList.length > 0){
            res.status(200).json(tutorList[0]);
        }else{
            res.status(404).json({error:"La cédula suministrada no esta registrada"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ocurrió un error al intentar obtener al tutor"})
    }
}


module.exports ={registerTutor, getTutor}