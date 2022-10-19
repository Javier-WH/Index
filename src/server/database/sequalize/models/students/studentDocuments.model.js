const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class StudentDocuments extends Model {}
StudentDocuments.init({
    birthAct: DataTypes.BOOLEAN,
    birthActCopy : DataTypes.BOOLEAN,
    _ci : DataTypes.BOOLEAN,
    photos : DataTypes.BOOLEAN,
    gradesCertificate : DataTypes.BOOLEAN,
    gradesCertificateCopy : DataTypes.BOOLEAN,
    canainaRecipe : DataTypes.BOOLEAN,
    sixGrade : DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: "studentDocuments",
    timestamps: false
});

module.exports = StudentDocuments

/**
 *   birthAct: false,
  birthActCopy: true,
  _ci: true,
  photos: false,
  gradesCertificate: false,
  gradesCertificateCopy: true,
  canainaRecipe: false,
  sixGrade: false,
 * 
 */