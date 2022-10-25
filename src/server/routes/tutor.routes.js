const express = require("express");
const Router = express.Router();
const {registerTutor, getTutor} = require("../controllers/tutor.controller.js")


Router.post("/tutor", express.json(), registerTutor);

Router.get("/tutor", express.urlencoded(), getTutor);








module.exports = Router;