const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Subjects extends Model {}
Subjects.init({
  subjects: DataTypes.JSON

}, {
    sequelize,
    modelName: "teacher_subjects",
    timestamps : false
});

module.exports = Subjects
