const express = require("express");
const Router = express.Router();
const {getStudentList} = require("../controllers/getStudent.controller.js");



Router.get("/studentList", express.urlencoded(), getStudentList)




module.exports = Router;