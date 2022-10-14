const express = require("express");
const Router = express.Router();


Router.post("/login", express.json(), (req, res)=>{
   const { user, pass, type} = req.body;
   if(user === "Javier" && pass === "123"){
    res.json({code : 1});
   }else{
       res.json({error: "El usuario no está registrado"})
   }
})



module.exports = Router;