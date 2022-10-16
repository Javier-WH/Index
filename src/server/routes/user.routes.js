const express = require("express");
const Router = express.Router();
const {getTeacherData} = require("../controllers/teaacher.controller")
const {getUserName} = require("../controllers/user.controller.js");

Router.get("/getUserName", getUserName);

Router.get("/getTeacherData", getTeacherData)


module.exports = Router;