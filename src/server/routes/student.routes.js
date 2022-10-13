const express = require("express");
const Router = express.Router();
const {getApp, getStudentList} = require("../controllers/getStudent.controller.js");

Router.get("/", getApp);

Router.get("/studentList", getStudentList)


module.exports = Router;