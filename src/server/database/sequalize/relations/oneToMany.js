const student = require("../models/students/studentList.model.js");
const grades = require("../models/students/grades.model.js");
const teacherSubjects = require("../models/teachers/subjects.model.js");
const teachers = require("../models/teachers/teachers.model.js");


student.hasMany(grades, {as: "grades", foreignKey:"userId"});

grades.belongsTo(student, {as:"user"});


///teachers

teachers.hasOne(teacherSubjects);
teacherSubjects.belongsTo(teachers);