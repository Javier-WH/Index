const { Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentMedicalInfo extends Model { }
StudentMedicalInfo.init({
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    chessSize: DataTypes.INTEGER,
    pantsSize: DataTypes.INTEGER,
    feetSize: DataTypes.INTEGER,
    gravidez: DataTypes.CHAR,
    pregnancyTime: DataTypes.STRING,
    influenza: DataTypes.BOOLEAN,
    asma: DataTypes.BOOLEAN,
    diabetes: DataTypes.BOOLEAN,
    epilepsia: DataTypes.BOOLEAN,
    tension: DataTypes.BOOLEAN,
    harth: DataTypes.BOOLEAN,
    drugAllegies: DataTypes.STRING,
    foodAllegies: DataTypes.STRING

}, {
    sequelize,
    modelName: "studentMedicalInfo",
    timestamps: false
});

module.exports = StudentMedicalInfo


/**
  weight: '12321',
  height: '3213',
  chessSize: '213213',
  pantsSize: '21321',
  feetSize: '3',
  gravidez: 'n',
  pregnancyTime: '',
  influenza: true,
  asma: false,
  diabetes: false,
  epilepsia: true,
  tension: true,
  harth: false,
  drugAllegies: '213213',
  foodAllegies: '123213',
 */