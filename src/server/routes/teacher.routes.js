const express = require("express");
const Router = express.Router();

const {insertTeacher, getTeacherByCi} = require("../controllers/teaacher.controller")


Router.post("/teacher", express.json(), insertTeacher)

Router.get("/teacher", express.urlencoded(), getTeacherByCi);

module.exports = Router;