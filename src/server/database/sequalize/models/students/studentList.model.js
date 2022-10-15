const {Model, Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentList extends Model {}
StudentList.init({
    names: DataTypes.STRING,
    lastNames: DataTypes.STRING,
    ci: DataTypes.INTEGER,
    gender: DataTypes.CHAR,
    birthdate: Sequelize.DATE,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
}, {
    sequelize,
    modelName: "studentList",
    timestamps : false
});

module.exports = StudentList
