const student = require("../models/studentList.model.js");
const grades = require("../models/grades.model.js");



student.hasMany(grades, {as: "grades", foreignKey:"userId"});

grades.belongsTo(student, {as:"user"});