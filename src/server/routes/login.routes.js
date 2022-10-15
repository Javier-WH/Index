const express = require("express");
const Router = express.Router();

const {validateUser} = require("../controllers/validateUser.controller")
const logOut = require("../controllers/logout.controller")

Router.post("/login", express.json(), validateUser);

Router.post("/logout", logOut);



module.exports = Router;