const path = require("path");
const sequelize = require("../database/sequalize/connection.js");
const StudentList = require("../database/sequalize/models/students/studentList.model.js");
const Grades = require("../database/sequalize/models/students/grades.model.js");
const Address = require("../database/sequalize/models/students/studentAddress.model.js");
const Documents = require("../database/sequalize/models/students/studentDocuments.model.js");
const Contacts = require("../database/sequalize/models/students/studentContact.model.js");
const Parents = require("../database/sequalize/models/students/studentParents.model.js");
const Medical = require("../database/sequalize/models/students/studentMedicalInfo.model.js");
const Resourses = require("../database/sequalize/models/students/studentResourses.model.js");
const Tutors = require("../database/sequalize/models/students/studentTutor.model.js");

const { getPensum } = require("../controllers/pensum.controller.js");

function getApp(req, res) {
    res.sendFile(res.sendFile(path.join(__dirname, "../../client/views/app.html")))
}

async function getStudentList(req, res) {
    try {
        let seccionData = req.query.seccion.split(" ");
        let schoolYear = seccionData[1][0];
        let seccion = seccionData[1][1];

        let rawList = await StudentList.findAll({
            include: {
                model: Grades,
                as: "grades",
                where: {
                    period: 2022,
                    section: seccion,
                    schoolYear
                }
            }
        })

        if (rawList.length > 0) {
            let list = rawList.map(register => {
                let student = {
                    ci: register.ci,
                    names: register.names,
                    lastNames: register.lastNames,
                    id: register.id,
                    photo: "default",
                    subjects: register.grades[0].subjects
                };
                return student;
            });

            res.json(list);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json([]);
    }
}
///////////////
async function insertStudent(req, res) {

    const insertStudent = await sequelize.transaction();

    try {
        let studentData = req.body;
        let tutorCi = studentData.tutorCi;

        let tutor = await Tutors.findAll({
            where: {
                tutorCi
            }
        }, { transaction: insertStudent })

        if (tutor.length <= 0) {
            res.json({ error: "El tutor no está registrado" })
            return
        }
        let tutorId = tutor[0].id;

        let std = await StudentList.create({
            names: studentData.names,
            lastNames: studentData.lastNames,
            ci: studentData.ci,
            gender: studentData.gender,
            birthdate: studentData.birthdate,
            tutorId
        }, { transaction: insertStudent });

        studentId = std.id;

        await Grades.create({
            period: studentData.period,
            section: studentData.seccion,
            schoolYear: studentData.grade,
            subjects: await getPensum(studentData.grade),
            studentId
        }, { transaction: insertStudent });


        await Address.create({
            previusSchool: studentData.previusSchool,
            birthCountry: studentData.birthCountry,
            birthState: studentData.birthState,
            birthPlace: studentData.birthPlace,
            nationality: studentData.nationality,
            married: studentData.married,
            parroquia: studentData.parroquia,
            town: studentData.town,
            urbanizacion: studentData.urbanizacion,
            stdAddres: studentData.stdAddres,
            whoLive: studentData.whoLive,
            municipio: studentData.municipio,
            homeState: studentData.homeState,
            studentId
        }, { transaction: insertStudent })

        await Documents.create({

            birthAct: studentData.birthAct,
            birthActCopy: studentData.birthActCopy,
            _ci: studentData._ci,
            photos: studentData.photos,
            gradesCertificate: studentData.gradesCertificate,
            gradesCertificateCopy: studentData.gradesCertificateCopy,
            canainaRecipe: studentData.canainaRecipe,
            sixGrade: studentData.sixGrade,
            studentId

        }, { transaction: insertStudent })


        await Contacts.create({
            studentPhone: studentData.studentPhone,
            studenEmail: studentData.studenEmail,
            facebook: studentData.facebook,
            twitter: studentData.twitter,
            tikTok: studentData.tikTok,
            instagram: studentData.instagram,
            studentId
        }, { transaction: insertStudent })


        await Parents.create({
            motherName: studentData.motherName,
            motherLastName: studentData.motherLastName,
            motherCi: studentData.motherCi,
            motherPhone: studentData.motherPhone,
            fatherName: studentData.fatherName,
            fatherLastName: studentData.fatherLastName,
            fatherCi: studentData.fatherCi,
            fatherPhone: studentData.fatherPhone,
            siblinsNumber: studentData.siblinsNumber,
            studentId
        }, { transaction: insertStudent })

        await Medical.create({
            weight: studentData.weight,
            height: studentData.height,
            chessSize: studentData.chessSize,
            pantsSize: studentData.pantsSize,
            feetSize: studentData.feetSize,
            gravidez: studentData.gravidez,
            pregnancyTime: studentData.pregnancyTime,
            influenza: studentData.influenza,
            asma: studentData.asma,
            diabetes: studentData.diabetes,
            epilepsia: studentData.epilepsia,
            tension: studentData.tension,
            harth: studentData.harth,
            drugAllegies: studentData.drugAllegies,
            foodAllegies: studentData.foodAllegies,
            studentId
        }, { transaction: insertStudent });


        await Resourses.create({
            houseType: studentData.houseType,
            houseCondition: studentData.houseCondition,
            emergencyName: studentData.emergencyName,
            emergencyPhone: studentData.emergencyPhone,
            emergencyRelation: studentData.emergencyRelation,
            canaima: studentData.canaima,
            tablet: studentData.tablet,
            smarthPhone: studentData.smarthPhone,
            pc: studentData.pc,
            becas: studentData.becas,
            becaName: studentData.becaName,
            studentPatriaCode: studentData.studentPatriaCode,
            studentPatriaSerial: studentData.studentPatriaSerial,
            studentId
        }, { transaction: insertStudent })


        await Tutors.update({
            tutorName: studentData.tutorName,
            tutorLastName: studentData.tutorLastName,
            // tutorCi: studentData.tutorCi,
            tutorNationality: studentData.tutorNationality,
            tutorInstruction: studentData.tutorInstruction,
            tutorPhone: studentData.tutorPhone,
            tutorEmail: studentData.tutorEmail,
            tutorAddress: studentData.tutorAddress,
            tutorPatriaCode: studentData.tutorPatriaCode,
            tutorPatriaSrial: studentData.tutorPatriaSrial,
            tutorBank: studentData.tutorBank,
            tutorBankAux: studentData.tutorBankAux,
            tutorBankAccounType: studentData.tutorBankAccounType,
            tutorBankAccoun: studentData.tutorBankAccoun,

        }, {
            where: {
                tutorCi
            },
            transaction: insertStudent
        })



        await insertStudent.commit();
        res.json({ message: "OK" })
    } catch (error) {
        console.log(error.message)
        await insertStudent.rollback();
        res.json({ error: "Ha ocurrido un error, no se ha inscrito al estudiante" })

    }

}

////////////////////////

async function getStudent(req, res) {

    const setStudentTransacction = await sequelize.transaction();

    try {
        let reqCi = req.query.ci

        let student = await StudentList.findAll({
            where: {
                ci: reqCi
            }

        }, { transaction: setStudentTransacction });

        if(student.length <= 0){
            res.status(404).json({error: "El alumno no está registrado"})
            return
        }

        let studentId = student[0].id;
        let tutorId = student[0].tutorId;
        
        let grades = await Grades.findAll({
            where:{
                studentId
            }
        }, { transaction: setStudentTransacction });


        let address = await Address.findAll({
            where:{
                studentId
            }
        }, { transaction: setStudentTransacction });
        
        let documents = await Documents.findAll({
            where:{
                studentId
            }
        }, { transaction: setStudentTransacction });
        
        let contacts = await Contacts.findAll({
            where:{
                studentId
            }
        }, { transaction: setStudentTransacction });
        
        let parents = await Parents.findAll({
            where:{
                studentId
            }
        }, { transaction: setStudentTransacction });
        
        let medical = await Medical.findAll({
            where:{
                studentId
            }
        }, { transaction: setStudentTransacction });
        
        let resourses = await Resourses.findAll({
            where:{
                studentId
            }
        }, { transaction: setStudentTransacction });
        
        
        let tutors = await Tutors.findAll({
            where:{
                id:tutorId
            }
        }, { transaction: setStudentTransacction });



        setStudentTransacction.commit();
        
        let studentData = { 
            ...student[0].dataValues, 
            ...grades[0].dataValues, 
            ...address[0].dataValues, 
            ...documents[0].dataValues, 
            ...contacts[0].dataValues, 
            ...parents[0].dataValues, 
            ...medical[0].dataValues, 
            ...resourses[0].dataValues, 
            ...tutors[0].dataValues 
        }

        res.json(studentData)
    } catch (error) {
        await setStudentTransacction.rollback();
        console.log(error.message)
        res.status(500).json({ error: "Ocurrió un error al buscar a este alumno" })
    }
}




module.exports = {
    getApp,
    getStudentList,
    insertStudent,
    getStudent
}

/*
students
{
                "Matemática":{
                    "lap1": "18",
                    "lap2": "19",
                    "lap3": "20",
                    "def": "19"
                },"Física":{
                    "lap1": "12",
                    "lap2": "16",
                    "lap3": "14",
                    "def": "13"
 }
}
teachers

 [
        {
           "Matemática": ["1A", "1B", "4A"],
            "Física": ["3A", "4B"],
            "Biología":["2A", "3A"]
        }
    ]



*/