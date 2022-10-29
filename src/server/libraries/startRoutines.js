const Pensum = require("../database/sequalize/models/config/pensum.model");
const Config = require("../database/sequalize/models/config/config.model");
const sequelize = require("../database/sequalize/connection.js")


async function routines() {

    checkPensum();
    checkConfig();
}


async function checkPensum() {

    const checkPensumTrasaction = await sequelize.transaction();

    try {

        let pensum = await Pensum.findAll({ transaction: checkPensumTrasaction });
        
        if (pensum.length < 5) {
            Pensum.destroy({
                where: {},
                transaction: checkPensumTrasaction
            })


            await Pensum.bulkCreate([
                {
                    schoolYear: 1,
                    subjects: ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Arte y Patrimonío", "Ciencias Naturales", "Geografía, Historia y Ciudadanía", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"]

                },
                {
                    schoolYear: 2,
                    subjects: ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Arte y Patrimonío", "Ciencias Naturales", "Geografía, Historia y Ciudadanía", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"]

                },
                {
                    schoolYear: 3,
                    subjects: ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Física", "Química", "Biología", "Geografía, Historia y Ciudadanía", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"]

                },
                {
                    schoolYear: 4,
                    subjects: ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Física", "Química", "Biología", "Geografía, Historia y Ciudadanía", "Formación para la Soberanía Nacional", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"]

                },
                {
                    schoolYear: 5,
                    subjects: ["Castellano", "Inglés y otras lenguas extranjeras", "Matemáticas", "Educación Física", "Física", "Química", "Biología", "Geografía, Historia y Ciudadanía", "Formación para la Soberanía Nacional", "Orientación y Convivencia", "Participación en Grupos de Creación, Recreación y Producción"]

                },

            ],{transaction: checkPensumTrasaction })
            console.log("Se ha restaurado el pensum de materias por defecto")
        }

        await checkPensumTrasaction.commit();
    } catch (error) {
       setTimeout(() => {
        checkPensum();
       }, 2000);
        await checkPensumTrasaction.rollback();
    }
}

//////////////////////////////////////

async function checkConfig(){

    const checkConfigTrasaction = await sequelize.transaction();

    try {
        let config = await Config.findAll({transaction:checkConfigTrasaction });

        if(config.length <=0){
            Config.destroy({
                where: {},
                transaction: checkConfigTrasaction
            });

            await Config.create({
                lap1: false,
                lap2: false,
                lap3:false,
                edit:false,
                period: 2022,
                maxSeccionCap: 30,
                maxGradeCap: 20,
                institutionName: "No se ha asignado un nombre a la institución"
            }, {
                transaction: checkConfigTrasaction
            })

            console.log("Se ha creado una configuracion por defecto")
        }


        checkConfigTrasaction.commit();
    } catch (error) {
        
        setTimeout(() => {
            checkConfig();
           }, 2000);

        checkConfigTrasaction.rollback()
    }



}



















module.exports = routines;