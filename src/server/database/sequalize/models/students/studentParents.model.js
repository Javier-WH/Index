const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentParents extends Model {}
StudentParents.init({
    motherName: DataTypes.STRING,
    motherLastName: DataTypes.STRING,
    motherCi: DataTypes.INTEGER,
    motherPhone: DataTypes.INTEGER,
    fatherName: DataTypes.STRING,
    fatherLastName: DataTypes.STRING,
    fatherCi: DataTypes.INTEGER,
    fatherPhone: DataTypes.INTEGER,
    siblinsNumber: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: "studentParents",
    timestamps: false
});

module.exports = StudentParents


/**
 *   motherName: 'ds21sd',
  motherLastName: 'sadd',
  motherCi: '2321',
  motherPhone: '213',
  fatherName: 'dsa',
  fatherLastName: 'asdas',
  fatherCi: '213',
  fatherPhone: '213',
  siblinsNumber: '21',
 */