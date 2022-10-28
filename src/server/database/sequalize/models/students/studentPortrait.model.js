const {Model, DataTypes } = require('@sequelize/core');
const sequelize = require("../../connection.js");

class Portraits extends Model {}
Portraits.init({
    photo: DataTypes.TEXT
}, {
    sequelize,
    modelName: "portraits",
    timestamps: false
});

module.exports = Portraits