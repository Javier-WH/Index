const express = require("express");
const Router = express.Router();
const {registerTutor, getTutor, getTutorPerfil} = require("../controllers/tutor.controller.js")


Router.post("/tutor", express.json(), registerTutor);

Router.get("/tutor", express.urlencoded(), getTutor);

Router.get("/tutor/perfil", getTutorPerfil);






module.exports = Router;