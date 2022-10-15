const express = require("express");
const Router = express.Router();

const {validateUser} = require("../controllers/validateUser.controller")


Router.post("/login", express.json(), validateUser)



module.exports = Router;