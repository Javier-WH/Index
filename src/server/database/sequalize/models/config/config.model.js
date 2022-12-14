const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Config extends Model {}
Config.init({
    lap1 : DataTypes.BOOLEAN,
    lap2 : DataTypes.BOOLEAN,
    lap3 : DataTypes.BOOLEAN,
    edit : DataTypes.BOOLEAN,
    period : DataTypes.INTEGER,
    maxSeccionCap : DataTypes.INTEGER,
    maxGradeCap : DataTypes.INTEGER,
    institutionName: DataTypes.STRING,
    failedNumber : DataTypes.INTEGER,
    evalPlan : DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: "config",
    timestamps: false
});

module.exports = Config
