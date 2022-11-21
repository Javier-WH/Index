const fs = require('fs');
const path = require("path");

async function getLogo(req, res) {

    let filePath = path.join(__dirname, `../utility/files/Logo.svg`);

    try {
        if (fs.existsSync(filePath)) {
            res.status(200).sendFile(filePath);
        } else {
            res.status(404).send("")
        }

    } catch (error) {

    }
}


async function setLogo(req, res) {
    try {

        let fileName = req.body.fileName;
        let oldPath = path.join(__dirname, `../utility/files/${fileName}`)
        let newPath = path.join(__dirname, `../utility/files/Logo.svg`)

        fs.rename(oldPath, newPath, () => {
            console.log(`Logo actualizado-> ${newPath}`)
        });

        res.status(200).json({ message: "OK" })
    } catch (error) {
        res.status(500).json({ error: "No se ha pudo actualizar la foto" })
    }

}

async function restoreLogo(req, res) {

    const logoPath =  path.join(__dirname, `../utility/files/Logo.svg`);

    try {
        if (fs.existsSync(logoPath)) {
            fs.unlinkSync(logoPath)
            res.status(200);
        }else{
            res.status(404)
        }
    } catch (err) {
        console.error(err)
        res.status(500);
    }

}

module.exports = {
    getLogo,
    setLogo,
    restoreLogo
}