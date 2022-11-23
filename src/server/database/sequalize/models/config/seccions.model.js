const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Seccions extends Model {}
Seccions.init({
    grade : DataTypes.INTEGER,
    seccionsNames : DataTypes.JSON
}, {
    sequelize,
    modelName: "Seccions",
    timestamps: false
});

module.exports = Seccions
