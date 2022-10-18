const path = require("path");
const StudentList = require("../database/sequalize/models/students/studentList.model.js");
const Grades = require("../database/sequalize/models/students/grades.model.js")

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
                    section:seccion,
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
async function insertStudent(req, res){

    console.log(req.body)
    res.json({message:"OK"})
}


module.exports = {
    getApp,
    getStudentList,
    insertStudent
}

/**
 * ci: '12312',
  names: '123213',
  lastNames: '213213',
  birthdate: '2022-01-01',
  studentPhone: '32132',
  studenEmail: '123213',
  grade: '1',
  seccion: 'A',
  period: '2022',
  previusSchool: '123213',
  birthCountry: 'Venezuela',
  birthState: 'Distrito Capital',
  birthPlace: 'Municipio Libertador (Caracas)',
  nationality: 'v',
  married: 's',
  gender: 'f',
  birthAct: false,
  birthActCopy: true,
  _ci: true,
  photos: false,
  gradesCertificate: false,
  gradesCertificateCopy: true,
  canainaRecipe: false,
  sixGrade: false,
  facebook: '123',
  twitter: '123',
  tikTok: '213',
  instagram: '123',
  motherName: 'ds21sd',
  motherLastName: 'sadd',
  motherCi: '2321',
  motherPhone: '213',
  fatherName: 'dsa',
  fatherLastName: 'asdas',
  fatherCi: '213',
  fatherPhone: '213',
  siblinsNumber: '21',
  parroquia: '21321',
  town: '123213',
  urbanizacion: '213213',
  stdAddres: '12321',
  whoLive: '213',
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


*/