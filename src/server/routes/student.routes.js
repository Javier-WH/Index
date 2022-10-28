const express = require("express");
const Router = express.Router();
const {getStudentList, insertStudent, getStudent, getPhoto, setPhoto} = require("../controllers/getStudent.controller.js");



Router.get("/studentList", express.urlencoded(), getStudentList);

Router.get("/student", express.urlencoded(), getStudent);

Router.post("/student", express.json(), insertStudent);

Router.get("/photo", express.urlencoded(), getPhoto);

Router.post("/photo", express.json(), setPhoto);

module.exports = Router;