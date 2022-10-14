const express = require("express");
const Router = express.Router();
const {homePage} = require("../controllers/login.controller.js");
const {getApp} = require("../controllers/getStudent.controller.js");

Router.get("/", homePage);

Router.get("/app", getApp);

module.exports = Router;