const { Sequelize } = require('@sequelize/core');
const fs = require("fs")

/*
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});
*/

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    dialect: "mysql",
    logging: false,
  });


async function getConnection() {
    try {
        await sequelize.sync({ force: false });
        console.log('La conexión a la base de datos ha sido existosa');

    } catch (error) {
        console.log(error)
        console.error(`Ha ocurrido un error al conectarse con la base de datos`);
    }
}

getConnection();

module.exports = sequelize;