const express = require("express");
const Router = express.Router();
const {getConfig, setConfig} = require("../controllers/config.controller.js");
const {getLogo, setLogo, restoreLogo} = require("../controllers/logoController.js")

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../utility/files"),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})



Router.get("/config", express.urlencoded(), getConfig);

Router.post("/config", express.json(), setConfig);

Router.get("/logo", getLogo);

Router.post ("/logo",  multer({ storage, dest: "fileContainer" }).single("file"), setLogo);

Router.delete("/logo", restoreLogo);



module.exports = Router;