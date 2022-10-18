const express = require("express");
const Router = express.Router();
const {getStudentList, insertStudent} = require("../controllers/getStudent.controller.js");



Router.get("/studentList", express.urlencoded(), getStudentList)

Router.post("/student", express.json(), insertStudent)


module.exports = Router;