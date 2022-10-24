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

async function insertStudent(studentData, tutorId, tutorCi){
    const insertStudent = await sequelize.transaction();
        
    try {

        
        let std = await StudentList.create({
            names: studentData.names,
            lastNames: studentData.lastNames,
            ci: studentData.ci,
            gender: studentData.gender,
            birthdate: studentData.birthdate,
            tutorId
        }, { transaction: insertStudent });
        
        let studentId = std.id;
       

        await Grades.create({
            period: studentData.period,
            section: studentData.seccion,
            schoolYear: studentData.grade,
            subjects: await getPensum(studentData.grade),
            failded: false,
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
        return {message: "OK"}

    } catch (error) {
        
        console.log(error.message)
        await insertStudent.rollback();
        return { error: "Ha ocurrido un error, no se ha inscrito al estudiant0e" }

    }


}

module.exports = insertStudent;