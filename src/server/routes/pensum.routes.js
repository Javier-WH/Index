const express = require("express");
const Router = express.Router();

const {getPensum, getMatricula} = require("../controllers/pensum.controller.js")


Router.get("/matricula", getMatricula);



module.exports = Router;