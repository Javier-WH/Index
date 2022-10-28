const Tutor = require("../database/sequalize/models/students/studentTutor.model.js");
const StudentList = require("../database/sequalize/models/students/studentList.model");
const Grades = require("../database/sequalize/models/students/grades.model")
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

async function getTutorPerfil(req, res){
    let id = req.session.tutorID;
    const perfilTransaction = await sequelize.transaction();
    try {
        let tutor = await Tutor.findAll({
            where:{
                id
            },
            transaction: perfilTransaction
        });

        if(tutor.length <= 0){
            res.status(404).json({error: "El tutor no está registrado"});
            return
        }

        let studens = await StudentList.findAll({
            where:{
                tutorId: id
            },
            transaction: perfilTransaction
        });

        if(studens.length <= 0){
            res.status(200).json({error: "El tutor no tiene estudiantes inscritos"});
            return
        }

        let idList = studens.map(student=>{
            return student.id;
        })

        let grades = await Grades.findAll({
            where:{
                studentId: idList
            },
            transaction: perfilTransaction
        })
  
        await perfilTransaction.commit();

        let stdGrades = studens.map(std=>{
            let grd = grades.filter(gr => std.id === gr.studentId)
            let obj = std;
            obj.dataValues.studentId = grd[0].studentId;
            obj.dataValues.seccion = grd[0].section;
            obj.dataValues.schoolYear = grd[0]. schoolYear;
            obj.dataValues.period = grd[0].period;
            obj.dataValues.failded = grd[0].failded;
            obj.dataValues.subjects = grd[grd.length - 1].subjects;
            return obj;
        })

        let data = tutor[0];
        data.dataValues.students = stdGrades;
        
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Ha ocurrido un error al obtener el perfil"})
        
    }
}

module.exports ={registerTutor, getTutor, getTutorPerfil}