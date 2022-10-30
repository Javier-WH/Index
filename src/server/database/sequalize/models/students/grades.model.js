const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Grades extends Model {}
Grades.init({
    subjects:DataTypes.JSON,
    period: DataTypes.INTEGER,
    section: DataTypes.CHAR,
    schoolYear: DataTypes.INTEGER, //grade
    failded: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN //inscrito / no inscrito
}, {
    sequelize,
    modelName: "grades",
    timestamps: false
});

module.exports = Grades

/*
  subjects
  period: '2022',
  seccion: 'A',
  grade: '1',

*/