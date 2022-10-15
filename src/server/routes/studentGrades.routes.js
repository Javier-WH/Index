const express = require("express");
const Router = express.Router();

const {saveGrades} = require("../controllers/studentGrades.controller")



Router.post("/saveGrades", express.json(), saveGrades)



module.exports = Router;