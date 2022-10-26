const Pensum = require("../database/sequalize/models/config/pensum.model")
const sequelize = require("../database/sequalize/connection.js")


async function routines() {

    checkPensum();
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





















module.exports = routines;