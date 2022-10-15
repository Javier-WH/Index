const student = require("../models/students/studentList.model.js");
const grades = require("../models/students/grades.model.js");



student.hasMany(grades, {as: "grades", foreignKey:"userId"});

grades.belongsTo(student, {as:"user"});