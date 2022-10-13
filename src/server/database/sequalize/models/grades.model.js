const {Model, Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require("../connection.js");

class Grades extends Model {}
Grades.init({
    subjects:DataTypes.JSON,
    period: DataTypes.INTEGER
}, {
    sequelize,
    modelName: "grades",
    timestamps: false
});

module.exports = Grades
