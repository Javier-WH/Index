const {Model, Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentList extends Model {}
StudentList.init({
    names: DataTypes.STRING,
    lastNames: DataTypes.STRING,
    ci: DataTypes.STRING,
    gender: DataTypes.CHAR,
    birthdate: Sequelize.DATE
}, {
    sequelize,
    modelName: "studentList",
    timestamps : false
});

module.exports = StudentList


/*
  names: '123213',
  lastNames: '213213',
  ci: '12312',
  gender: 'f',
  birthdate: '2022-01-01',
*/