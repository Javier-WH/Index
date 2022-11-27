const express = require("express");
const Router = express.Router();
const {saveEvalplanData, getEvalPlan} = require("../controllers/evalPlan.controller")
const {saveStdEval, getStdEval} = require("../controllers/stdEvalPlan.controler")

Router.post("/evalPlan", express.json(), saveEvalplanData);

Router.post("/getEvalPlan", express.json(), getEvalPlan);

////////////////////

Router.post("/stdEval", express.json(), saveStdEval);

Router.post("/getStdEval", express.json(), getStdEval);

module.exports = Router;