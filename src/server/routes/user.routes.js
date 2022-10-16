const express = require("express");
const Router = express.Router();

const {getUserName} = require("../controllers/user.controller.js");

Router.get("/getUserName", getUserName);


module.exports = Router;