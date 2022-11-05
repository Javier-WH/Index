const express = require("express");
const Router = express.Router();

const {insertTeacher, getTeacherByCi, getTeacherList, fireTeacher} = require("../controllers/teaacher.controller")


Router.post("/teacher", express.json(), insertTeacher)

Router.get("/teacher", express.urlencoded(), getTeacherByCi);

Router.get("/teacherList", getTeacherList);

Router.delete("/teacher", express.json(), fireTeacher)



module.exports = Router;