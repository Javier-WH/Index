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
const newStudent = require("../libraries/insertNewStudent.js");
const updateStudent = require("../libraries/UpdateInscribeStudent.js");
const { checkFailed } = require("../libraries/checkFailSubjects.js");
const fs = require('fs');
const { getSchoolYear, getSubjectName, getSeccionName } = require("../libraries/translateSeccionData")

function getApp(req, res) {
    res.sendFile(res.sendFile(path.join(__dirname, "../../client/views/app.html")))
}

async function getStudentList(req, res) {
    try {

        ///esto corrige un bug que se genera en un lugar indeterminado, donde se agrega un espacio adicional al valor de la seccion
        let seccionData = req.query.seccion.replace("  ", " ");

        // let schoolYear = seccionData[seccionData.length - 2]
        let schoolYear = getSchoolYear(seccionData);

        //let seccion = seccionData[seccionData.length - 1]
        let seccion = getSeccionName(seccionData);

        if (schoolYear === undefined || seccion === undefined) {
            res.status(403);
            return
        }


        let rawList = await StudentList.findAll({
            include: {
                model: Grades,
                as: "grades",
                where: {
                    period: 2022,///////////////////////////
                    section: seccion,
                    schoolYear,
                    status: true
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
                    gender: register.gender,
                    subjects: register.grades[0].subjects
                };
                return student;
            });

            res.json(list);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json([]);
    }
}
///////////////

async function inscribeStudent(req, res) {
    const updateStudentTransacction = await sequelize.transaction();
    try {

        let data = req.body;

        let existSTD = await StudentList.findAll({
            where: {
                ci: data.ci
            },
            transaction: updateStudentTransacction
        })

        if (existSTD.length <= 0) {
            res.status(404).json({ error: "El estudiante no est?? inscrito" });
            return
        }
        let studentId = existSTD[0].id



        await StudentList.update({
            names: data.names,
            lastNames: data.lastNames,
            ci: data.ci,
            gender: data.gender,
            birthdate: data.birthdate
        }, {
            where: {
                id: studentId
            },
            transaction: updateStudentTransacction
        })


        await Grades.update({
            status: true,
            section: data.seccion,
            period: data.period,
            schoolYear: data.grade,
        }, {
            where: {
                studentId
            },
            transaction: updateStudentTransacction
        })

        await Address.update({
            previusSchool: data.previusSchool,
            birthCountry: data.birthCountry,
            birthState: data.birthState,
            birthPlace: data.birthPlace,
            nationality: data.nationality,
            married: data.married,
            parroquia: data.parroquia,
            town: data.town,
            urbanizacion: data.urbanizacion,
            stdAddres: data.stdAddres,
            whoLive: data.whoLive,
            municipio: data.municipio
        }, {
            where: {
                studentId
            },
            transaction: updateStudentTransacction
        });

        await Documents.update({
            birthAct: data.birthAct,
            birthActCopy: data.birthActCopy,
            _ci: data._ci,
            photos: data.photos,
            gradesCertificate: data.gradesCertificate,
            gradesCertificateCopy: data.gradesCertificateCopy,
            canainaRecipe: data.canainaRecipe,
            sixGrade: data.sixGrade
        }, {
            where: {
                studentId
            },
            transaction: updateStudentTransacction
        })

        await Contacts.update({
            studentPhone: data.studentPhone,
            studenEmail: data.studenEmail,
            facebook: data.facebook,
            twitter: data.twitter,
            tikTok: data.tikTok,
            instagram: data.instagram
        }, {
            where: {
                studentId
            },
            transaction: updateStudentTransacction
        })

        await Parents.update({
            motherName: data.motherName,
            motherLastName: data.motherLastName,
            motherCi: data.motherCi,
            motherPhone: data.motherPhone,
            fatherName: data.fatherName,
            fatherLastName: data.fatherLastName,
            fatherCi: data.fatherCi,
            fatherPhone: data.fatherPhone,
            siblinsNumber: data.siblinsNumber
        }, {
            where: {
                studentId
            },
            transaction: updateStudentTransacction
        })


        await Medical.update({
            weight: data.weight,
            height: data.height,
            chessSize: data.chessSize,
            pantsSize: data.pantsSize,
            feetSize: data.feetSize,
            gravidez: data.gravidez,
            pregnancyTime: data.pregnancyTime,
            influenza: data.influenza,
            asma: data.asma,
            diabetes: data.diabetes,
            epilepsia: data.epilepsia,
            tension: data.tension,
            harth: data.harth,
            drugAllegies: data.drugAllegies,
            foodAllegies: data.foodAllegies

        }, {
            where: {
                studentId
            },
            transaction: updateStudentTransacction
        })

        await Resourses.update({
            houseType: data.houseType,
            houseCondition: data.houseCondition,
            emergencyName: data.emergencyName,
            emergencyPhone: data.emergencyPhone,
            emergencyRelation: data.emergencyRelation,
            canaima: data.canaima,
            tablet: data.tablet,
            smarthPhone: data.smarthPhone,
            pc: data.pc,
            becas: data.becas,
            becaName: data.becaName,
            studentPatriaCode: data.studentPatriaCode,
            studentPatriaSerial: data.studentPatriaSerial
        }, {
            where: {
                studentId
            },
            transaction: updateStudentTransacction
        })


        await updateStudentTransacction.commit();
        res.status(200).json({ message: "OK" })

    } catch (error) {
        console.log(error.message);
        await updateStudentTransacction.rollback();
    }



}





//////////
async function insertStudent(req, res) {

    try {
        let studentData = req.body;
        let tutorCi = studentData.tutorCi;

        //revisa si el estudiante ya existe
        let studentId = 0;
        let student = await StudentList.findAll({ where: { ci: studentData.ci } })

        if (student.length > 0) {
            studentId = student[0].id
        }


        //revisa si el tutor est?? inscrito
        let tutor = await Tutors.findAll({
            where: {
                tutorCi
            }
        })

        if (tutor.length <= 0) {
            res.json({ error: "El tutor no est?? registrado" })
            return
        }
        let tutorId = tutor[0].id;

        //Revisa que el estudiante no est?? inscrito en el periodo escolar y el grado escoplar
        let AlreadyRegistered = await Grades.findAll({
            where: {
                studentId,
                schoolYear: studentData.grade,
                period: studentData.period
            }
        })


        if (AlreadyRegistered.length > 0) {
            res.json({ error: "El Estudiante ya ha sido registrado para este grado y periodo escolar" })
            return
        }

        //revisa si tiene notas apalzadas
        let failed = await checkFailed(studentData.ci, studentData.grade);


        //revisa si el estudiante ya existe

        if (student.length > 0) {
            //actualiza al estudiante e inscribe un nuevo periodo escolar
            let updatedStudent = await updateStudent(studentData, tutorCi, failed, studentId);

            res.status(200).json({ message: updatedStudent })

        } else {
            //crea un nuevo registro del estudiante
            let insertedStudent = await newStudent(studentData, tutorId, tutorCi);

            res.status(200).json({ message: insertedStudent })
        }



    } catch (error) {
        console.log(error)
        res.json({ error: "Ha ocurrido un error, no se ha inscrito al estudianteX" })

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

        if (student.length <= 0) {
            res.status(404).json({ error: "El alumno no est?? registrado" })
            return
        }

        let studentId = student[0].id;
        let tutorId = student[0].tutorId;

        let grades = await Grades.findAll({
            where: {
                studentId
            }
        }, { transaction: setStudentTransacction });


        let address = await Address.findAll({
            where: {
                studentId
            }
        }, { transaction: setStudentTransacction });

        let documents = await Documents.findAll({
            where: {
                studentId
            }
        }, { transaction: setStudentTransacction });

        let contacts = await Contacts.findAll({
            where: {
                studentId
            }
        }, { transaction: setStudentTransacction });

        let parents = await Parents.findAll({
            where: {
                studentId
            }
        }, { transaction: setStudentTransacction });

        let medical = await Medical.findAll({
            where: {
                studentId
            }
        }, { transaction: setStudentTransacction });

        let resourses = await Resourses.findAll({
            where: {
                studentId
            }
        }, { transaction: setStudentTransacction });


        let tutors = await Tutors.findAll({
            where: {
                id: tutorId
            }
        }, { transaction: setStudentTransacction });



        setStudentTransacction.commit();

        let studentData = {
            ...student[0].dataValues,
            ...grades[grades.length - 1].dataValues,
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
        res.status(500).json({ error: "Ocurri?? un error al buscar a este alumno" })
    }
}

//////////////////////

async function getPhoto(req, res) {

    let id = req.query.id;

    let filePath = path.join(__dirname, `../utility/files/${id}.jpg`);

    try {

        if (fs.existsSync(filePath)) {
            res.status(200).sendFile(filePath);
        } else {
            res.status(404).send("")
        }

    } catch (error) {

    }
}


async function setPhoto(req, res) {
    try {
        let id = req.body.studentId;
        let fileName = req.body.fileName;

        let oldPath = path.join(__dirname, `../utility/files/${fileName}`)
        let newPath = path.join(__dirname, `../utility/files/${id}.jpg`)

        fs.rename(oldPath, newPath, () => {
            console.log(`Foto actualizada-> ${newPath}`)
        });

        res.status(200).json({ message: "OK" })
    } catch (error) {
        res.status(500).json({ error: "No se ha pudo actualizar la foto" })
    }

}

////////////////////////////////////////////

async function getStudentFullList(req, res) {
    try {

        let rawList = await StudentList.findAll({
            include: {
                model: Grades,
                as: "grades"
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
                    gender: register.gender,
                    subjects: register.grades[Number.parseInt(register.grades.length) - 1].subjects,
                    seccion: register.grades[Number.parseInt(register.grades.length) - 1].section,
                    period: register.grades[Number.parseInt(register.grades.length) - 1].period,
                    grade: register.grades[Number.parseInt(register.grades.length) - 1].schoolYear,
                };
                return student;
            });
            res.json(list);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json([]);
    }
}
////

async function deleteStudent(req, res) {
    let ci = req.body.ci;

    try {

        let request = await StudentList.destroy({
            where: {
                ci
            }
        })

        if (request === 0) {
            res.status(200).json({ error: "La c??dula suministrada no esta registrada" });
        } else {
            res.status(200).json({ message: "El alumno ha sido borrado del sistema" });
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Ha ocurrido un error" })
    }

}

module.exports = {
    getApp,
    getStudentList,
    insertStudent,
    getStudent,
    getPhoto,
    setPhoto,
    inscribeStudent,
    getStudentFullList,
    deleteStudent
}

/*
students
{
                "Matem??tica":{
                    "lap1": "18",
                    "lap2": "19",
                    "lap3": "20",
                    "def": "19"
                },"F??sica":{
                    "lap1": "12",
                    "lap2": "16",
                    "lap3": "14",
                    "def": "13"
 }
}
teachers

 [
        {
           "Matem??tica": ["1A", "1B", "4A"],
            "F??sica": ["3A", "4B"],
            "Biolog??a":["2A", "3A"]
        }
    ]



*/