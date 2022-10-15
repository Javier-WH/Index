const {Model, Sequelize, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Teachers extends Model {}
Teachers.init({
    names: DataTypes.STRING,
    lastNames: DataTypes.STRING,
    ci: DataTypes.INTEGER,
    gender: DataTypes.CHAR,
    birthdate: Sequelize.DATE,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    user:DataTypes.STRING,
    password:DataTypes.STRING
}, {
    sequelize,
    modelName: "teachers",
    timestamps : false
});

module.exports = Teachers
