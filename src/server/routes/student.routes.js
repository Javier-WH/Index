const express = require("express");
const Router = express.Router();
const {getStudentList, insertStudent, getStudent} = require("../controllers/getStudent.controller.js");



Router.get("/studentList", express.urlencoded(), getStudentList);

Router.get("/student", express.urlencoded(), getStudent);

Router.post("/student", express.json(), insertStudent);



module.exports = Router;