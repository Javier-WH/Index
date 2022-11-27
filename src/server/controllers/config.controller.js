const Config = require("../database/sequalize/models/config/config.model.js")

async function getConfig(req, res) {

    if (req.session.adminsID === undefined &&  req.session.teachersID === undefined) {
        res.status(403).send("Acceso denegado");
        return
    }


    try {
        let config = await Config.findAll();
        res.status(200).json(config[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Corrió un error al obtener la configucación del sistema" });
    }



}

async function setConfig(req, res) {
    try {
       
        let { lap1, lap2, lap3, edit, period, maxGradeCap, maxSeccionCap, institutionName, failedNumber, evalPlan } = req.body;
        await Config.update({
            lap1, lap2, lap3, edit, period, maxGradeCap, maxSeccionCap, institutionName, failedNumber, evalPlan
        }, {
            where: {
                id: 1
            }
        })
        res.status(200).json({ message: "OK" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Ocrurrió un error" })
    }
}

module.exports = { setConfig, getConfig }