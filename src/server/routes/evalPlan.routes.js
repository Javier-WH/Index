const express = require("express");
const Router = express.Router();
const {saveEvalplanData, getEvalPlan} = require("../controllers/evalPlan.controller")


Router.post("/evalPlan", express.json(), saveEvalplanData);

Router.post("/getEvalPlan", express.json(), getEvalPlan);



module.exports = Router;