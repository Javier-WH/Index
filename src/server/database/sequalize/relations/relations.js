const student = require("../models/students/studentList.model.js");
const grades = require("../models/students/grades.model.js");
const studentTutors = require("../models/students/studentTutor.model.js");
const studentAddress = require("../models/students/studentAddress.model.js");
const studentContact = require("../models/students/studentContact.model.js");
const studentDocuments = require("../models/students/studentDocuments.model.js");
const studentMedicalInfo = require("../models/students/studentMedicalInfo.model.js");
const StudentParents = require("../models/students/studentParents.model.js");
const studentResourses = require("../models/students/studentResourses.model.js");
const Failed = require("../models/students/failedStudents.js");


//////
const teacherSubjects = require("../models/teachers/subjects.model.js");
const teachers = require("../models/teachers/teachers.model.js");


//students
student.hasMany(grades, {as: "grades", foreignKey:"studentId", onDelete:"CASCADE"});
grades.belongsTo(student, {as:"student"});
//
studentTutors.hasMany(student, {as: "students", foreignKey:"tutorId", onDelete:"CASCADE"});
student.belongsTo(studentTutors, {as: "tutor"});
//
student.hasOne(studentAddress, {as: "address", foreignKey:"studentId", onDelete:"CASCADE"});
studentAddress.belongsTo(student, {as:"student"});
//
student.hasOne(studentContact, {as: "contacts", foreignKey:"studentId", onDelete:"CASCADE"});
studentContact.belongsTo(student, {as:"student"});
//
student.hasOne(studentDocuments, {as: "documents", foreignKey:"studentId", onDelete:"CASCADE"});
studentDocuments.belongsTo(student, {as:"student"});
//
student.hasOne(studentMedicalInfo, {as: "medical", foreignKey:"studentId", onDelete:"CASCADE"});
studentMedicalInfo.belongsTo(student, {as:"student"});
//
student.hasOne(StudentParents, {as: "parents", foreignKey:"studentId", onDelete:"CASCADE"});
StudentParents.belongsTo(student, {as:"student"});
//
student.hasOne(studentResourses, {as: "resourses", foreignKey:"studentId", onDelete:"CASCADE"});
studentResourses.belongsTo(student, {as:"student"});
//
student.hasMany(Failed, {as: "failed", foreignKey:"studentId", onDelete:"CASCADE"});
Failed.belongsTo(student, {as:"student"});
//





///teachers
teachers.hasOne(teacherSubjects, {as: "subjects", foreignKey:"teacherId", onDelete:"CASCADE"});
teacherSubjects.belongsTo(teachers, {as:"teacher"});