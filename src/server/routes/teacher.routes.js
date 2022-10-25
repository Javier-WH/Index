const express = require("express");
const Router = express.Router();

const {insertTeacher} = require("../controllers/teaacher.controller")


Router.post("/teacher", express.json(), insertTeacher)



module.exports = Router;