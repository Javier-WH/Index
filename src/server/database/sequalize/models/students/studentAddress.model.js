const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentAddress extends Model {}
StudentAddress.init({
    previusSchool: DataTypes.STRING,
    birthCountry: DataTypes.STRING,
    birthState: DataTypes.STRING,
    birthPlace: DataTypes.STRING,
    nationality: DataTypes.CHAR,
    married: DataTypes.CHAR,
    parroquia: DataTypes.STRING,
    town: DataTypes.STRING,
    urbanizacion: DataTypes.STRING,
    stdAddres: DataTypes.STRING,
    whoLive: DataTypes.STRING,
    municipio : DataTypes.STRING,
    homeState: DataTypes.STRING
}, {
    sequelize,
    modelName: "studentAddress",
    timestamps: false
});

module.exports = StudentAddress



/*
sadasd
  previusSchool: '123213',
  birthCountry: 'Venezuela',
  birthState: 'Distrito Capital',
  birthPlace: 'Municipio Libertador (Caracas)',
  nationality: 'v',
  married: 's',
  parroquia: '21321',
  town: '123213',
  urbanizacion: '213213',
  stdAddres: '12321',
  whoLive: '213',
  municipio,
  homeState
*/