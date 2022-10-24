const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Failed extends Model {}
Failed.init({
    subjects:DataTypes.JSON,
    period: DataTypes.INTEGER,
    section: DataTypes.CHAR,
    schoolYear: DataTypes.INTEGER, //grade
}, {
    sequelize,
    modelName: "failed",
    timestamps: false
});

module.exports = Failed