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

const {getPensum} = require("../controllers/pensum.controller.js");

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
/////
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
    } catch (error) {
        //console.log(error)
        await insertStudent.rollback();
        res.json({ error: "Ha ocurrido un error, no se ha inscrito al estudiante" })

    }
    res.json({ message: "OK" })

}


module.exports = {
    getApp,
    getStudentList,
    insertStudent
}

/** studentList
  names: '123213',
  lastNames: '213213',
  ci: '12312',
  gender: 'f',
  birthdate: '2022-01-01',

  ////////// grades
  subjects
  period: '2022',
  seccion: 'A',
  grade: '1',

  ///////////// studentAddress
  previusSchool: '123213',
  birthCountry: 'Venezuela',
  birthState: 'Distrito Capital',
  birthPlace: 'Municipio Libertador (Caracas)',
  nationality: 'v',
  married: 's',
  parroquia: '21321',
  town: '123213',
  urbanizacion: '213213',
  stdAddres: '12321',
  whoLive: '213',

  ///////// studentDocuments
  birthAct: false,
  birthActCopy: true,
  _ci: true,
  photos: false,
  gradesCertificate: false,
  gradesCertificateCopy: true,
  canainaRecipe: false,
  sixGrade: false,
  
  //////// studentContact
  studentPhone: '32132',
  studenEmail: '123213',
  facebook: '123',
  twitter: '123',
  tikTok: '213',
  instagram: '123',


  /////////StudentParents
  motherName: 'ds21sd',
  motherLastName: 'sadd',
  motherCi: '2321',
  motherPhone: '213',
  fatherName: 'dsa',
  fatherLastName: 'asdas',
  fatherCi: '213',
  fatherPhone: '213',
  siblinsNumber: '21',

  
  /////// StudentMedicalInfo
  weight: '12321',
  height: '3213',
  chessSize: '213213',
  pantsSize: '21321',
  feetSize: '3',
  gravidez: 'n',
  pregnancyTime: '',
  influenza: true,
  asma: false,
  diabetes: false,
  epilepsia: true,
  tension: true,
  harth: false,
  drugAllegies: '213213',
  foodAllegies: '123213',

  ////studentResourses
  houseType: 'CasaFamiliar',
  houseCondition: 'Media',
  emergencyName: '12321',
  emergencyPhone: '21321',
  emergencyRelation: '213',
  canaima: true,
  tablet: true,
  smarthPhone: true,
  pc: true,
  becas: true,
  becaName: '21321',
  studentPatriaCode: '12321',
  studentPatriaSerial: '123213',

  //// studentTutor
  tutorName: '12321',
  tutorLastName: '213',
  tutorCi: '12321',
  tutorNationality: 'e',
  tutorInstruction: '1',
  tutorPhone: '123213',
  tutorEmail: '123213',
  tutorAddress: '213',
  tutorPatriaCode: '123123',
  tutorPatriaSrial: '123',
  tutorBank: 'BANCO DE VENEZUELA, S.A. BANCO UNIVERSAL.',
  tutorBankAux: '',
  tutorBankAccounType: 'ahorros',
  tutorBankAccoun: '12321332131'
 * 
 * 
 */


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