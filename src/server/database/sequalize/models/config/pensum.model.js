const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Pensum extends Model {}
Pensum.init({
    schoolYear: DataTypes.INTEGER,
    subjects: DataTypes.JSON
}, {
    sequelize,
    modelName: "pensum",
    timestamps: false
});

module.exports = Pensum
