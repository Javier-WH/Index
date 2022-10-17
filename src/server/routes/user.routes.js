const express = require("express");
const Router = express.Router();
const {getTeacherData, setTeacherData} = require("../controllers/teaacher.controller")
const {getUserName } = require("../controllers/user.controller.js");

Router.get("/getUserName", getUserName);

Router.get("/getTeacherData", getTeacherData);

Router.put("/setTeacherData", express.json(), setTeacherData);


module.exports = Router;