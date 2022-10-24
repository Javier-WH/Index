const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentResourses extends Model {}
StudentResourses.init({
    houseType: DataTypes.STRING,
    houseCondition: DataTypes.STRING,
    emergencyName: DataTypes.STRING,
    emergencyPhone: DataTypes.STRING,
    emergencyRelation: DataTypes.STRING,
    canaima: DataTypes.BOOLEAN,
    tablet: DataTypes.BOOLEAN,
    smarthPhone: DataTypes.BOOLEAN,
    pc: DataTypes.BOOLEAN,
    becas: DataTypes.BOOLEAN,
    becaName: DataTypes.STRING,
    studentPatriaCode: DataTypes.STRING,
    studentPatriaSerial: DataTypes.STRING,
}, {
    sequelize,
    modelName: "studentResourses",
    timestamps: false
});

module.exports = StudentResourses



/**
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
  studentPatriaSerial: '123213'
 */