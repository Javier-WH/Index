const { Sequelize } = require('@sequelize/core');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});


async function getConnection() {
    try {
        await sequelize.sync({ force: false });
        console.log('La conexión a la base de datos ha sido existosa');

    } catch (error) {
        console.error(`Ha ocurrido un error al conectarse con la base de datos: ${error.code}`);
    }
}

getConnection();

module.exports = sequelize;