const express = require("express");
const Router = express.Router();

const {getTeacherSubjects} = require("../controllers/teacherSubjects.controller")


Router.get("/teacherSubjects", getTeacherSubjects)



module.exports = Router;