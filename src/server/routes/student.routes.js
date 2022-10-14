const express = require("express");
const Router = express.Router();
const {getStudentList} = require("../controllers/getStudent.controller.js");



Router.get("/studentList", getStudentList)


module.exports = Router;