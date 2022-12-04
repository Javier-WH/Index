const { Sequelize } = require('@sequelize/core');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

//const sequelize = new Sequelize('postgres://xaver84:1dP3JkM7nrvD1jgXJwcjsImu5D2Z7VWb@dpg-ce6e6l2rrk071o5hnlt0-a.oregon-postgres.render.com/razetti?ssl=true')
//const sequelize = new Sequelize('mysql://ucqj7utvnh1spnpl:oHZyYPFYsSTMUCHBzTOE@bdlrwlpxkqqq1tvjyyyf-mysql.services.clever-cloud.com:3306/bdlrwlpxkqqq1tvjyyyf')

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