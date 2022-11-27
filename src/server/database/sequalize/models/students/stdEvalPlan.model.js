const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StdGrades extends Model {}
StdGrades.init({
    stdid: DataTypes.INTEGER,
    stdGrades:DataTypes.JSON,
    period: DataTypes.INTEGER,
    section: DataTypes.STRING,
    schoolYear: DataTypes.INTEGER, //grade
    failded: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN //inscrito / no inscrito
}, {
    sequelize,
    modelName: "StdGrades",
    timestamps: false
});

module.exports = StdGrades

/*
  subjects
  period: '2022',
  seccion: 'A',
  grade: '1',

*/