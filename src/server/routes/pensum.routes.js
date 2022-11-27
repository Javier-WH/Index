const express = require("express");
const Router = express.Router();

const {getMatricula, updatePensum} = require("../controllers/pensum.controller.js")


Router.get("/matricula", getMatricula);

Router.put("/matricula", express.json(), updatePensum);

module.exports = Router;