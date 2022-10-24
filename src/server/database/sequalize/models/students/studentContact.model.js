const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentContact extends Model {}
StudentContact.init({
    studentPhone: DataTypes.STRING,
    studenEmail: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    tikTok: DataTypes.STRING,
    instagram: DataTypes.STRING

}, {
    sequelize,
    modelName: "studentContact",
    timestamps: false
});

module.exports = StudentContact

/**
 *   studentPhone: '32132',
  studenEmail: '123213',
  facebook: '123',
  twitter: '123',
  tikTok: '213',
  instagram: '123',
 */