const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentTutor extends Model {}
StudentTutor.init({
    tutorName: DataTypes.STRING,
    tutorLastName: DataTypes.STRING,
    tutorCi: DataTypes.INTEGER,
    tutorNationality: DataTypes.CHAR,
    tutorInstruction: DataTypes.INTEGER,
    tutorPhone:DataTypes.INTEGER,
    tutorEmail: DataTypes.STRING,
    tutorAddress: DataTypes.STRING,
    tutorPatriaCode: DataTypes.STRING,
    tutorPatriaSrial:  DataTypes.STRING,
    tutorBank: DataTypes.STRING,
    tutorBankAux: DataTypes.STRING,
    tutorBankAccounType: DataTypes.STRING,
    tutorBankAccoun: DataTypes.STRING,
}, {
    sequelize,
    modelName: "studentTutor",
    timestamps: false
});

module.exports = StudentTutor



/**
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
 */