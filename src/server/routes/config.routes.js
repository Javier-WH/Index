const express = require("express");
const Router = express.Router();
const {getConfig, setConfig} = require("../controllers/config.controller.js")

Router.get("/config", express.urlencoded(), getConfig);

Router.post("/config", express.json(), setConfig);

module.exports = Router;