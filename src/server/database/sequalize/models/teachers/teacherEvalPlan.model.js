const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class TeacherEvalPlan extends Model {}
TeacherEvalPlan.init({
  grade: DataTypes.INTEGER,
  subjecName: DataTypes.STRING,
  seccionName: DataTypes.STRING,
  teacherId: DataTypes.INTEGER,
  evalPlan: DataTypes.JSON

}, {
    sequelize,
    modelName: "teacherEvalPlan",
    timestamps : false
});

module.exports = TeacherEvalPlan
